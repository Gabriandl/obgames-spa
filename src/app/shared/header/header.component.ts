import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin!: boolean
  isUserLoggedIn!: boolean

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
    window.localStorage.getItem("token") ? this.isUserLoggedIn = true : this.isUserLoggedIn = false ; 
    window.localStorage.getItem("roles")?.includes("ADMIN") ? this.isAdmin = true : this.isAdmin = false ;
  }

  logout(): void{
    window.localStorage.clear();
    window.localStorage.getItem("token") ? this.isUserLoggedIn = true : this.isUserLoggedIn = false ; 
    window.localStorage.getItem("roles")?.includes("ADMIN") ? this.isAdmin = true : this.isAdmin = false ;
    // navego para a rota vazia novamente
    this.router.navigate(['login']);
    //console.log(window.localStorage.getItem("username"))
  }

}
