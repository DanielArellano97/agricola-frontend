import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, public router:Router) { }

 salir(){
   let username = this.authService.usuario.nombre;
     //swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');


    swal.fire({
  title: 'Cerrar sesión',
  text: `${username}  ¿Quieres salir del sistema?`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Salir'
}).then((result) => {
  if (result.isConfirmed) {

     this.authService.logout();
    this.router.navigate(['/login']);
  }
})

 }

  mostrar() {
    let flag = document.getElementById("sidebar").className;
    if (flag === "active") {
      document.getElementById("sidebar").className = "";
    } else {
      document.getElementById("sidebar").className = "active";
    }
  }

}
