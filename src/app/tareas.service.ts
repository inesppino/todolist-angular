import { Injectable, EventEmitter } from '@angular/core';
import { Tarea } from './tarea';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private URL: string = "https://todo-list-603ba.firebaseio.com/tasks"
  sendTarea = new EventEmitter<Tarea>();
  datosCambiados = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Array<Tarea>> {
    return this.http.get(`${this.URL}.json`)
      .pipe(
        map((resp) => {
          return this.parseResponseToArray(resp);
        })
      )
  }

  addTarea(nombre: string): Observable<any> {
    const tarea = { nombre: nombre, completada: false }
    return this.http.post(`${this.URL}.json`, tarea);
  }

  deleteTarea(id: string): Observable<any> {
    console.log('borrando');
    console.log(id);
    return this.http.delete(`${this.URL}/${id}.json`);
  }

  updateTarea(tarea: Tarea): Observable<any> {
    const tareaActualizada = { nombre: tarea.nombre, completada: tarea.completa };
    return this.http.put(`${this.URL}/${tarea.id}.json`, tareaActualizada);
  }

  sendTareaToEdit(tarea: Tarea): void {
    this.sendTarea.emit(tarea);
  }

  actualizarVista(): void {
    this.datosCambiados.emit(true);
  }

  parseResponseToArray(resp): Array<Tarea> {
    let arrayTareas: Array<Tarea> = [];
    for (let id in resp) {
      let obj = resp[id];
      const tarea = new Tarea(obj.nombre, obj.completada, id);
      arrayTareas.push(tarea);
    }
    return arrayTareas;
  }

}
