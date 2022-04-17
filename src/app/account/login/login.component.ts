import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };

  constructor(
    private accountService: AccountService,
    public notifierService: NotifierService,
    private router: Router
  ) { }

  ngOnInit() {
  }

   login() {
    
      this.accountService.login(this.loginData).subscribe({
        next: n => { 
          if (n.accessToken) {
          window.localStorage.setItem('token', n.accessToken);
          this.notifierService.showSuccesNotification(`Login efetuado: ${n.username}`);
          // navego para a rota vazia novamente
          this.router.navigate(['']);
          } else if (n.message) {
            this.notifierService.showAllertNotification(n.message);
          } else { throw new Error }
        
        }
      })
  }
}