import { Component, OnInit } from '@angular/core';
import { Relatorio } from 'src/app/models/Relatorio';
import { RelatorioService } from 'src/app/services/relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})
export class RelatorioComponent implements OnInit {
  selectOption = [
    { value: 1 , description: "5 jogos que receberam maior número de avaliações"},
    { value: 2 , description: "5 membros que realizaram o maior número de avaliações"},
    { value: 3 , description: "5 jogos que têm a maior nota média de avaliação"},
    { value: 4 , description: "3 categorias que receberam maior número de avaliações"}
  ]
  selectedOption!: string;
  dataInicial!: Date;
  dataFinal!: Date;
  relatorio: Relatorio = {};


  constructor(
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
  }

  buscar(): void {
    console.log(this.dataInicial.getTime() / 1000);
    console.log(this.dataFinal.getTime() / 1000);

    this.relatorioService.getRelatorio(this.selectedOption, (this.dataInicial.getTime() / 1000), (this.dataFinal.getTime() / 1000))
    .subscribe((data: Relatorio) => {
      this.relatorio = data;
    })
  }

}
