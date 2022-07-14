import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quer-sair-confirm',
  templateUrl: './quer-sair-confirm.component.html',
  styleUrls: ['./quer-sair-confirm.component.scss']
})
export class QuerSairConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QuerSairConfirmComponent>) { }

  ngOnInit(): void {
  }

}
