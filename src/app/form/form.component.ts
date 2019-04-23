import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TareasService } from '../tareas.service';
import { Tarea } from '../tarea';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  formTarea: FormGroup;
  esNuevaTarea = true;
  editarTarea: Tarea;

  constructor(private tareasService: TareasService) { }

  ngOnInit() {
    this.inicializarForm();
    this.tareasService.sendTarea.subscribe((tarea: Tarea) => {
      this.editarTarea = tarea;
      this.esNuevaTarea = false;
      this.inicializarForm();
    });
  }

  inicializarForm(){
    let nombreTarea = this.esNuevaTarea ? '' : this.editarTarea.nombre;
    this.formTarea = new FormGroup({
      nombre: new FormControl(nombreTarea, Validators.required)
    });
  }

  guardar(){
    const nombreTarea = this.formTarea.value.nombre
    console.log(nombreTarea);

    if(this.esNuevaTarea){
      this.tareasService.addTarea(nombreTarea).subscribe((resp)=>{
        console.log(resp);
      });

    } else {
      const tareaActualizada = new Tarea(nombreTarea, this.editarTarea.completa, this.editarTarea.id);
      this.tareasService.updateTarea(tareaActualizada).subscribe();
    }
    
    this.formTarea.reset();
    this.esNuevaTarea = true;
  }

}
