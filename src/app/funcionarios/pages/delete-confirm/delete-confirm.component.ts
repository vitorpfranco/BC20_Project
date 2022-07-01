import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  deleteFalse: boolean = false;
  deleteTrue:boolean = true;
  constructor(public dialogRef: MatDialogRef<DeleteConfirmComponent>) { }
  ngOnInit(): void {
  }

}
