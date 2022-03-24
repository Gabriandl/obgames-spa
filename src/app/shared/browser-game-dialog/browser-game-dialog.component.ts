import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-browser-game-dialog',
  templateUrl: './browser-game-dialog.component.html',
  styleUrls: ['./browser-game-dialog.component.scss'],
  providers: [CategoriaService]
})
export class BrowserGameDialogComponent implements OnInit {
  browserGame!: BrowserGame;
  isChange!: boolean;
  categorias!: Categoria[];
  form: FormGroup;
  selectedCategoria = new FormControl(this.data.categoria.id);
  
  


  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: BrowserGame,
    public dialogRef: MatDialogRef<BrowserGameDialogComponent>,
    public categoriaService: CategoriaService,
    
    
  ) {
    this.form = new FormGroup({
      selectedCategoria: this.selectedCategoria
    });
  }

  ngOnInit(): void {
    if (this.data.id) {
      this.isChange = true;
      
    } else {
      this.isChange = false;

    }
    this.categoriaService.getCategorias()
    .subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  sendBrowserGameData(data: BrowserGame,selectedCategoria: string): void {
    this.data = data;
    this.data.categoria.id = selectedCategoria;
    this.dialogRef.close(this.data)
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
