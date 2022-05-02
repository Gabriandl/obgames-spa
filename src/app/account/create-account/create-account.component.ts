import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
   usuario: Usuario = {dataNasc: "" }

  constructor(
    public accountService: AccountService,
    public notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.usuario)
    .subscribe({
      next: n => { 
        this.notifierService.showSuccesNotification(`Usuario ${this.usuario.nomeCompleto} criado!`);
        this.router.navigate(['/login']);
      
      },
      error: e => {
        console.log("Gabriel debug: "+ JSON.stringify(e));
        this.notifierService.showAllertNotification(`Ocorreu um erro durante a criação do seu cadastro, tente novamente!`);
      }
    })
  }
}
