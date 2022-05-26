import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { NotifierService } from 'src/app/services/notifier.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  date = new FormControl();
  userId = window.localStorage.getItem("userId") || "string-not-null"
  usuario: Usuario = {dataNasc: ""}

  constructor(
    private usuarioService: UsuarioService,
    private notifierService: NotifierService,
    private router: Router
    
    ) {

      
     
     }

  ngOnInit(): void {

    this.usuarioService.getBrowserGameById(this.userId)
        .subscribe((data: Usuario) => {
          this.usuario = data;
          this.date = new FormControl(new Date(this.usuario.dataNasc))
        })
    
  }

  salvar() {
    this.usuario.dataNasc = this.date.value;
    this.usuarioService.editCategoria(this.usuario)
        .subscribe(() => {
          this.ngOnInit();
          this.notifierService.showSuccesNotification("Usuario atualizado com sucesso!")
          this.router.navigate(['/home']);

        })
    
  }

  editarSenha() {
    this.router.navigate(['/reset-password']);
  }

}
