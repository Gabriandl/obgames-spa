import { Component, OnInit } from '@angular/core';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { BrowserGameService } from 'src/app/services/browserGame.service';
import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';

@Component({
  selector: 'app-recomendacao',
  templateUrl: './recomendacao.component.html',
  styleUrls: ['./recomendacao.component.scss']
})
export class RecomendacaoComponent implements OnInit {
  userId = window.localStorage.getItem("userId") || "string-not-null"
  breakpoint!: number
  browserGames!: BrowserGame[]
  recomendacoesSize!: number
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.primary;

  constructor(
    public browserGameService: BrowserGameService
  ) { }

  ngOnInit():  void {    
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 4;
    this.browserGameService.getRecomendationByUsuarioId(this.userId)
      .subscribe((data: BrowserGame[]) => {
        this.browserGames = data;
        this.recomendacoesSize = this.browserGames.length;
      })
    
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
}
