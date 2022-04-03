import { Component, OnInit } from '@angular/core';
import {AuthService} from '../usuarios/auth.service'
@Component({
  selector: 'app-sidenav-definitivo',
  templateUrl: './sidenav-definitivo.component.html',
  styleUrls: ['./sidenav-definitivo.component.css']
})
export class SidenavDefinitivoComponent {

  nombre: string;
  rol: string[];
  rolTrans: string;

  constructor(public  authService:AuthService) { 
    this.nombre = authService.usuario.nombre;
    this.rol = authService.usuario.roles;
    this.comparativaRol();
    
  }



  comparativaRol(){
    if(this.rol[0] == "ROLE_ADMIN"){
      this.rolTrans = "Administad@r";
    }else{
      if(this.rol[0] == "ROLE_ADMINCAMPO"){
        this.rolTrans = "Administad@r de campo";
      }else{
        if(this.rol[0] == "ROLE_DUENO"){
          this.rolTrans = "Dueñ@ de campo";
        }else{
          if(this.rol[0] == "ROLE_ENCARGADOBPA"){
            this.rolTrans = "Encargad@ BPA";
          }
        }
      }
    }    
  }



}
