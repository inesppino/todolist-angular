import { Component, OnInit } from '@angular/core';
import { Tarea } from '../tarea';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit {

  tareas: Array<Tarea> = [];

  constructor(private tareasService: TareasService) { }

  ngOnInit() {
    this.inicializarTareas();
  }

  inicializarTareas(){
    this.tareasService.getTareas().subscribe(tareas => {
      this.tareas = tareas;
    });
  }
}
