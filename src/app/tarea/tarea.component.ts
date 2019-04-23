import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from '../tarea';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})

export class TareaComponent implements OnInit {
  @Input() tarea: Tarea;
  
  constructor(private tareasService: TareasService) { }

  ngOnInit() {
  }

  eliminar(){
    this.tareasService.deleteTarea(this.tarea.id).subscribe(()=>{
      this.tareasService.actualizarVista();
    });
  }

  actualizar(){
    const tareaActualizada = new Tarea (this.tarea.nombre, !this.tarea.completa, this.tarea.id);
    this.tareasService.updateTarea(tareaActualizada).subscribe(()=>{
      this.tareasService.actualizarVista();
    });
  }

  editar(){
    this.tareasService.sendTareaToEdit(this.tarea);
  }
}
