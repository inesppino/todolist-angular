import { Injectable, EventEmitter } from '@angular/core';
import { Tarea } from './tarea';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  //Esto es cuando no usabamos llamadas a https.
  // private idCont: number=3;
  // private tareas: Array<Tarea> = [new Tarea('ver GoT', false, '0'),
  //          new Tarea('Acabar la lista de Tareas', false, '1'),
  //          new Tarea('Morir', false, '2')]

  private URL: string = "https://todo-list-603ba.firebaseio.com/tasks"
  sendTarea = new EventEmitter();

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Array<Tarea>> {
    return this.http.get(`${this.URL}.json`)
      .pipe(
        map((resp) => {
          return this.parseResponseToArray(resp);
        })
      )
  }

  getTarea(id: string): Tarea {
    return this.tareas.find((tarea) => {
      return tarea.id === id;
    })
  }

  addTarea(nombre: string): void {
    const tarea = { nombre: nombre, completada: false }
    this.http.post(`${this.URL}.json`, tarea);
  }

  deleteTarea(tarea: Tarea): void {
    const pos = this.tareas.indexOf(tarea);
    this.tareas.splice(pos, 1);
  }

  updateTarea(tareaVieja: Tarea, tareaNueva: Tarea): void {
    const pos = this.tareas.indexOf(tareaVieja);
    this.tareas[pos] = tareaNueva;
  }

  sendTareaToEdit(tarea: Tarea): void {
    this.sendTarea.emit(tarea);
  }

  parseResponseToArray(resp): Array<Tarea> {
    let arrayTareas: Array<Tarea> = [];
    for (let id in resp) {
      let obj = resp[id];
      const tarea = new Tarea(obj.nombre, obj.completada, obj.id);
    }
    return arrayTareas;
  }

}
