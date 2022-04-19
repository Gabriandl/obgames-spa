import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { Categoria } from 'src/app/models/Categoria';
import { BrowserGameService } from 'src/app/services/browserGame.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SafePipe } from 'src/app/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ BrowserGameService, CategoriaService, SafePipe ]
})
export class HomeComponent implements OnInit {
  breakpoint!: number
  browserGames!: BrowserGame[]
  categorias!: Categoria[];
  selectedCategoria = 'Todas'
  nome = ''
  iframeSrc=this.sanitizationService.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/WnWPXZ6vQB8')

  constructor(
    public browserGameService: BrowserGameService,
    public categoriaService: CategoriaService,
    private sanitizationService: DomSanitizer

  ) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.browserGameService.getBrowserGames()
        .subscribe((data: BrowserGame[]) => {
          this.browserGames = data;
        })
    this.categoriaService.getCategorias()
        .subscribe((categorias: Categoria[]) => {
          this.categorias = categorias;
        });
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 4;
  }

  filter() {
    if (!this.nome && this.selectedCategoria == "Todas"){
      this.browserGameService.getBrowserGames()
        .subscribe((data: BrowserGame[]) => {
          this.browserGames = data;
        })
    } else if (!this.nome && this.selectedCategoria != "Todas"){
      this.browserGameService.getBrowserGamesByCategoryId(this.selectedCategoria)
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data;
      })
    } else if (this.nome && this.selectedCategoria != "Todas"){
      this.browserGameService.getBrowserGamesByCategoryId(this.selectedCategoria)
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data.filter(browserGame => (browserGame.nome.toLowerCase().includes(this.nome)));
      })
    } else {
      this.browserGameService.getBrowserGames()
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data.filter(browserGame => (browserGame.nome.toLowerCase().includes(this.nome)));
      })
    }
  }
  transform(url: string) {
    this.iframeSrc =  url
  }

}
