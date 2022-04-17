import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
   usuario = {
    nomeCompleto: '',
    username: '',
    senha: '',
    dataNasc: '',
    estado: '',
    pais: '',
   }

  constructor(
    public accountService: AccountService,
    public notifierService: NotifierService
  ) { }

  ngOnInit() {
  }

  register() {
    this.accountService.createAccount(this.usuario)
    .subscribe({
      next: n => { 
        this.notifierService.showSuccesNotification(n);
      
      },
      error: e => {
        console.log("Gabriel debug: "+ JSON.stringify(e));
        this.notifierService.showAllertNotification(e.message);
      }
    })
  }
}
