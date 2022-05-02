import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AccountService } from 'src/app/services/account.service';
import { NotifierService } from 'src/app/services/notifier.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: ''
  };
  public isUserLoggedIn = new BehaviorSubject<boolean>(false);
  

  constructor(
    private accountService: AccountService,
    public notifierService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

   login() {

      this.accountService.login(this.loginData).subscribe({
        next: n => { 
          if (n.accessToken) {
          window.localStorage.setItem('token', n.accessToken);
          window.localStorage.setItem('username', n.username);
          window.localStorage.setItem('userId', n.id);
          window.localStorage.setItem('roles', n.roles);          
          this.notifierService.showSuccesNotification(`Bem vindo ao Only Browser Games ${n.username}!`);
          // navego para a rota vazia novamente
          this.router.navigate(['']);
          } else if (n.message) {
            this.notifierService.showAllertNotification(n.message);
          } else { throw new Error }
        
        }
      })
      
  }
}