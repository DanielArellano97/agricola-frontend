import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import{Usuario} from './usuario';
import swal from 'sweetalert2';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuario:Usuario;

  constructor(private authService: AuthService,private router: Router) {
  this.usuario= new Usuario();}

  ngOnInit(): void {
        if(this.authService.isAuthenticated()){
        swal.fire('Login',`Hola ${this.authService.usuario.nombre} ya estás auntenticado!`, "info");
        this.router.navigate(['/home']);
      }

   }
 login(){

  if(this.usuario.username == null || this.usuario.password== null){
    swal.fire('error login', 'Username o password vacias','error');
    return;
  }
  this.authService.login(this.usuario).subscribe(response =>{
    this.authService.guardarUsuario(response.access_token);
    this.authService.guardarToken(response.access_token);
    let usuario = this.authService.usuario;
     this.router.navigate(['/home']);
     swal.fire("Login", `Bienvenid@ ${usuario.nombre}, has iniciado sesión exitosamente!`,"success");
  },err =>{
     if (err.status == 400){
       swal.fire("Error Login", "Usuario o clave incorrectas!", 'error');
     }
  });
 }



}
