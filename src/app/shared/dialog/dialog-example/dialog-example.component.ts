import { Component, OnInit,Input } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ModificarUsuarioComponent } from '../../../Modulo_Seguridad/CU_Modificar_Usuario/modificar.usuario.component';

@Component({
  selector:"app-dialog",
  templateUrl: './dialog-example.component.html',
  styleUrls: [
    './dialog-example.component.scss'
  ]
})
export class DialogExampleComponent implements OnInit {
  title:string;
  description:string;
  option1:string;
  option2:string;
  
  constructor(private dialogRef: MdDialogRef<DialogExampleComponent>) {
  }


  ngOnInit(): void {
  }
}
