import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { BrowserGameService } from 'src/app/services/browserGame.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { BrowserGameDialogComponent } from 'src/app/shared/browser-game-dialog/browser-game-dialog.component';

@Component({
  selector: 'app-browserGame',
  templateUrl: './browserGame.component.html',
  styleUrls: ['./browserGame.component.scss'],
  providers: [ BrowserGameService ]

})
export class BrowserGameComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['nome', 'categoria','descricao', 'timestamp', 'actions'];
  dataSource!: BrowserGame[];

  constructor(
    public dialog: MatDialog,
    public browserGameService: BrowserGameService,
    private notifierService: NotifierService
    ) {
      
    }

  ngOnInit(): void {
    this.browserGameService.getBrowserGames()
        .subscribe((data: BrowserGame[]) => {
          this.dataSource = data;
        })
  }

  openDialog(browserGame: BrowserGame | null): void {
    const dialogRef = this.dialog.open(BrowserGameDialogComponent, {
      width: '250px',
      data: browserGame === null ? {
        nome: '',
        urlImagem: '',
        urlVideo: '',
        urlJogo: '',
        descricao: '',
        timestamp: null,
        dataCriacao: null,
        categoria: {}
      } : {
        id: browserGame.id,
        nome: browserGame.nome,
        urlImagem: browserGame.urlImagem,
        urlVideo: browserGame.urlVideo,
        urlJogo: browserGame.urlJogo,
        descricao: browserGame.descricao,
        timestamp: browserGame.timestamp,
        dataCriacao: browserGame.dataCriacao,
        categoria: browserGame.categoria
      } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(b => b.id).includes(result.id)){
          this.browserGameService.editBrowserGame(result)
          .subscribe((data: BrowserGame) => {
            this.notifierService.showSuccesNotification(`Browser Game editado!`)
            this.ngOnInit();
            this.table.renderRows();
          });
        } else {
          this.browserGameService.createBrowserGames(result)
            .subscribe((data: BrowserGame) => {
              this.notifierService.showSuccesNotification(`Browser Game criado!`)
              this.ngOnInit();
              this.table.renderRows();
            })
        }
      }
    });
  }

  editBrowserGame(browserGame: BrowserGame): void {
    this.openDialog(browserGame);
  }

  deleteBrowserGame(id: string): void {
    this.browserGameService.deleteBrowserGame(id)
    .subscribe((data: any) => {
      this.notifierService.showSuccesNotification(`Browser Game deletado!`)
      this.ngOnInit();
      this.table.renderRows();
    })
  }

}
