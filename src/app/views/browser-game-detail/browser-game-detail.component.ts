import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Avaliacao } from 'src/app/models/Avaliacao';
import { BrowserGame } from 'src/app/models/BrowserGame';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { BrowserGameService } from 'src/app/services/browserGame.service';

@Component({
  selector: 'app-browser-game-detail',
  templateUrl: './browser-game-detail.component.html',
  styleUrls: ['./browser-game-detail.component.scss'],
  providers: [ BrowserGameService, AvaliacaoService ]
})
export class BrowserGameDetailComponent implements OnInit {
  browserGameId!: string;
  browserGame!: BrowserGame;
  avaliacoes!: Avaliacao[];

  constructor(
    private route: ActivatedRoute,
    private browserGameService: BrowserGameService,
    private avaliacaoService: AvaliacaoService
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
        })
  }

}
