import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetData = {
    userId: window.localStorage.getItem("userId"),
    newPassword: '',
    newPasswordConfirmed: ''
  };

  constructor(
    private accountService: AccountService,
    public notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  reset() {
    if (this.resetData.newPassword === this.resetData.newPasswordConfirmed) {
      this.accountService.resetPassword({
        idUsuario: this.resetData.userId,
        newPassword: this.resetData.newPasswordConfirmed
      }).subscribe({
        next: n => { 
          if (!n.code) {
            console.log(JSON.stringify(n))         
          this.notifierService.showSuccesNotification(n.message);
          // navego para a rota vazia novamente
          } else { throw new Error }
        
        }
      })
    } else {
      this.notifierService.showAllertNotification("As senhas não são iguais, digite novamente.");
      this.resetData.newPassword = '';
      this.resetData.newPasswordConfirmed = '';
    }
  }

}
