import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-categoria-dialog',
  templateUrl: './categoria-dialog.component.html',
  styleUrls: ['./categoria-dialog.component.scss'],
 // providers: [CategoriaService]
})
export class CategoriaDialogComponent implements OnInit {
  categoria!: Categoria;
  isChange!: boolean;
    
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: Categoria,
    public dialogRef: MatDialogRef<CategoriaDialogComponent>
    
    
  ) {
  
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.isChange = true;
      
    } else {
      this.isChange = false;

    }
  }

  sendCategoriaData(data: Categoria): void {
    this.data = data;
    this.dialogRef.close(this.data)
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
