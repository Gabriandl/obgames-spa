import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { CategoriaDialogComponent } from 'src/app/shared/categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [ CategoriaService ]

})
export class CategoriaComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['nome', 'descricao', 'actions'];
  dataSource!: Categoria[];

  constructor(
    public dialog: MatDialog,
    public categoriaService: CategoriaService,
    public notifierService: NotifierService

    ) {
      
    }

  ngOnInit(): void {
    this.categoriaService.getCategorias()
        .subscribe((data: Categoria[]) => {
          this.dataSource = data;
        })
  }

  openDialog(categoria: Categoria | null): void {
    const dialogRef = this.dialog.open(CategoriaDialogComponent, {
      width: '250px',
      data: categoria === null ? {
        nome: '',
        descricao: ''
      } : {
        id: categoria.id,
        nome: categoria.nome,
        descricao: categoria.descricao,
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(b => b.id).includes(result.id)){
          this.categoriaService.editCategoria(result)
          .subscribe((data: Categoria) => {
            this.notifierService.showSuccesNotification(`Categoria editada!`)

            this.ngOnInit();
            this.table.renderRows();
          });
        } else {
          this.categoriaService.createCategorias(result)
            .subscribe((data: Categoria) => {
              this.notifierService.showSuccesNotification(`Categoria criada!`)
              this.ngOnInit();
              this.table.renderRows();
            })
        }
      }
    });
  }

  editCategoria(categoria: Categoria): void {
    this.openDialog(categoria);
  }

  deleteCategoria(id: string): void {
    this.categoriaService.deleteCategoria(id)
    .subscribe({
      next: n => { 
        this.notifierService.showSuccesNotification(`Categoria deletado!`)
        this.ngOnInit(); 
        this.table.renderRows();
      },
      error: e => {
        //console.log("Gabriel debug: "+ JSON.stringify(e));
        e.error.code == '5001'? this.notifierService.showAllertNotification(e.error.message) : null ;
      }
    })
  }

}
