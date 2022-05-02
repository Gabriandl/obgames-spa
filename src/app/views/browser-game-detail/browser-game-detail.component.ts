import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avaliacao } from 'src/app/models/Avaliacao';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { Usuario } from 'src/app/models/Usuario';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { BrowserGameService } from 'src/app/services/browserGame.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { StarRatingColor } from 'src/app/shared/star-rating/star-rating.component';

@Component({
  selector: 'app-browser-game-detail',
  templateUrl: './browser-game-detail.component.html',
  styleUrls: ['./browser-game-detail.component.scss'],
  providers: [ BrowserGameService, AvaliacaoService ]
})
export class BrowserGameDetailComponent implements OnInit {
  userId = window.localStorage.getItem("userId") || "string-not-null"
  usuario:Usuario = {id: this.userId, dataNasc: ""};
  browserGameId!: string;
  browserGame!: BrowserGame;
  avaliacoes!: Avaliacao[];
  avaliacao: Avaliacao = { numEstrelas: 0, comentario: '', usuario: {dataNasc: ""},browserGame: {id:'', nome:'',avgEstrelas:0, categoria: {nome:''}}};
  comentario!: string;
  alreadyEvaluated!: boolean
  alreadyLiked: Array<string | undefined> = []
  
  rating:number = 0;
  starCount:number = 5;
  starColor:StarRatingColor = StarRatingColor.primary;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(
    private route: ActivatedRoute,
    private browserGameService: BrowserGameService,
    private avaliacaoService: AvaliacaoService,
    private notifierService: NotifierService
    ) { 
    this.route.params.subscribe(res => this.browserGameId = res['id']);

  }

  ngOnInit(): void {
    console.log(this.browserGameId);
    this.browserGameService.getBrowserGameById(this.browserGameId)
        .subscribe((data: BrowserGame) => {
          this.browserGame = data;
        })
    this.avaliacaoService.getAvaliacoesByBrowserGameId(this.browserGameId)
        .subscribe((data: Avaliacao[]) => {
          this.avaliacoes = data;
        
          this.avaliacoes.forEach(a => {
            if (JSON.stringify(a.curtidas).includes(this.userId)) {
              this.alreadyLiked.push(a.id)
            }

            if(a.usuario.id == this.userId){
              this.avaliacao = a;
              this.alreadyEvaluated = true
            } else {
              this.alreadyEvaluated = false 
            }

          })
        })
        
  }

  onRatingChanged(rating: number){
    this.avaliacao.numEstrelas = rating;
  }

  avaliar(): void{
    
    this.avaliacao.browserGame.id = this.browserGameId;
    this.avaliacao.usuario.id = window.localStorage.getItem("userId");
    this.avaliacaoService.createAvaliacao(this.avaliacao).subscribe((data: Avaliacao) => {
      this.notifierService.showSuccesNotification(`Obrigado por avaliar!`)
      console.log(data);
      this.load();
    })
    
  }

  editarAvaliacao(): void {
    this.avaliacaoService.editAvaliacao(this.avaliacao).subscribe((data: Avaliacao) => {
      console.log("Avaliacao edited"+data);
      this.notifierService.showSuccesNotification(`Sua avaliação foi editada!`)
      this.load();
    })
  }

  curtir(avaliacaoId: string | undefined): void{
    
    this.avaliacaoService.addCurtida(avaliacaoId, this.userId).subscribe((data: Avaliacao) => {
      console.log(data);
      this.notifierService.showSuccesNotification(`Você curtiu uma avaliação!`)
      this.load();
    })
  }

  descurtir(avaliacaoId: string | undefined): void{
    
    this.avaliacaoService.deleteCurtida(avaliacaoId, this.userId).subscribe((data: Avaliacao) => {
      console.log(data);
      this.notifierService.showSuccesNotification(`Você descurtiu uma avaliação!`)
      this.load();
    })
  }

    load() {
      //Session storage salva os dados como string
      location.reload();
      
    }
  

}
