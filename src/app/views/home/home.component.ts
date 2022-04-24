import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { Categoria } from 'src/app/models/Categoria';
import { BrowserGameService } from 'src/app/services/browserGame.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ BrowserGameService, CategoriaService ]
})

export class HomeComponent implements OnInit {
  breakpoint!: number
  browserGames!: BrowserGame[]
  browserGamesSize!: number
  categorias!: Categoria[];
  selectedCategoria = 'Todas'
  nome = ''
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.primary;

  constructor(
    public browserGameService: BrowserGameService,
    public categoriaService: CategoriaService,

  ) { }

  ngOnInit():  void {    
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.browserGameService.getBrowserGames()
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data;
        this.browserGamesSize = this.browserGames.length;
      })
    this.categoriaService.getCategorias()
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
    
  }

  onResize(event: any) {

    if (event.target.innerWidth > 1200) {
      this.breakpoint = 4

    } 
    if (event.target.innerWidth <= 1200) {
      this.breakpoint = 3

    } 
    if (event.target.innerWidth <= 900) {
      this.breakpoint = 2

    } 
    if (event.target.innerWidth <= 600) {
      this.breakpoint = 1
    }  
    
  }

  filter() {
    if (!this.nome && this.selectedCategoria == "Todas"){
      this.browserGameService.getBrowserGames()
        .subscribe((data: BrowserGame[]) => {
          this.browserGames = data;
          this.browserGamesSize = this.browserGames.length;
        })
    } else if (!this.nome && this.selectedCategoria != "Todas"){
      this.browserGameService.getBrowserGamesByCategoryId(this.selectedCategoria)
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data;
        this.browserGamesSize = this.browserGames.length;
      })
    } else if (this.nome && this.selectedCategoria != "Todas"){
      this.browserGameService.getBrowserGamesByCategoryId(this.selectedCategoria)
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data.filter(browserGame => (browserGame.nome.toLowerCase().includes(this.nome)));
        this.browserGamesSize = this.browserGames.length;
      })
    } else {
      this.browserGameService.getBrowserGames()
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data.filter(browserGame => (browserGame.nome.toLowerCase().includes(this.nome)));
        this.browserGamesSize = this.browserGames.length;
      })
    }
  }

}
