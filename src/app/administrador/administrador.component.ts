import { Component, OnInit } from '@angular/core';
import { Administrador } from './administrador';
import { AdministradorService } from './administrador.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {AuthService} from '../usuarios/auth.service';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

    administrador: Administrador = new Administrador();
    administradores: Administrador[];
    pageActual: number = 1;
    flag: boolean = false;
    contAdmins: number = 0;

    constructor(private administradorService: AdministradorService, private router: Router,
       private activatedRoute: ActivatedRoute, private authService: AuthService) { }

    ngOnInit(): void {
      this.listaAdministradoresService();
    }

    listaAdministradoresService() {
      this.administradorService.getAdministradores().subscribe(
        (administradores) => {
          this.administradores = administradores;
          this.contAdmins = administradores.length;
        });
    }

    delete(administrador: Administrador): void {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que desea eliminar el Administrador ${administrador.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, estoy seguro',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.administradorService.deleteAdministrador(administrador.run).subscribe(
            response => {
              this.administradores = this.administradores.filter(adm => adm !== administrador);
            }
          )
          swalWithBootstrapButtons.fire(
            'Administrador eliminado!',
            'El Administrador ha sido eliminado.',
            'success'
          )
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La eliminación del Administrador se canceló',
            'error'
          )
        }
      })
    }

    crear(): void {
      this.administradorService.crearAdministrador(this.administrador).subscribe(
        (json) => {
          this.router.navigate(['/administradores'])
          swal.fire('Nuevo Administrador', `El Administrador ${this.administrador.nombre}, ha sido creado con éxito`, 'success');
          this.listaAdministradoresService();
        }
      )
    }

    update(): void {
      this.administradorService.updateAdministrador(this.administrador).subscribe(
        (json) => {
          this.router.navigate(['/administradores']);
          swal.fire('Administrador actualizado', `El Administrador ${this.administrador.nombre}, ha sido actualizado con éxito`, 'success');
          this.administradorService.getAdministradores().subscribe(
            (administradores) => this.administradores = administradores
          );
        }
      )
    }

    cargarAdministrador(run: string): void {
      this.flag = true;
      this.activatedRoute.params.subscribe(params => {
        if (run) {
          this.administradorService.getAdministrador(run).subscribe((administrador) => this.administrador = administrador);
        }
      })
    }

    vaciarInputs(adminForm: NgForm) {
      this.administrador = new Administrador();
      let pass2 = <HTMLInputElement>document.getElementById('pass2');
      pass2.value = "";
      var p1 = document.getElementById("error");
      var p2 = document.getElementById("ok");
      p1.style.display = "none";
      p2.style.display = "none";
      adminForm.resetForm();
    }

    verificarPasswords() {
 
      // Ontenemos los valores de los campos de contraseñas 
      let pass1 = <HTMLInputElement>document.getElementById('pass1');
      let pass2 = <HTMLInputElement>document.getElementById('pass2');
   
      // Verificamos si las constraseñas no coinciden 
      if (pass1.value != pass2.value) {
   
          // Si las constraseñas no coinciden mostramos un mensaje 
          var p1 = document.getElementById("error");
          var p2 = document.getElementById("ok");
          p1.style.display = "block";
          p2.style.display = "none";

          //desactivamos el boton de agregar
          this.flag = false;
      } else {
   
          // Si las contraseñas coinciden ocultamos el mensaje de error
          var p1 = document.getElementById("error");
          var p2 = document.getElementById("ok");
          p1.style.display = "none";
          p2.style.display = "block";

   
          // Mostramos un mensaje mencionando que las Contraseñas coinciden 
          // document.getElementById("ok").classList.remove("ocultar");
   
          // Habilitamos el botón de agregar 
          this.flag = true;
      }
   
  }


}
