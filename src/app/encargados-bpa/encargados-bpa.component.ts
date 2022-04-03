import { Component, OnInit } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { EncargadoBPAService } from './encargado-bpa.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-encargados-bpa',
  templateUrl: './encargados-bpa.component.html',
  styleUrls: ['./encargados-bpa.component.css']
})
export class EncargadosBPAComponent implements OnInit {

  titulo: string = "Crear Encargado BPA";
  encargado: EncargadoBPA = new EncargadoBPA();
  encargadosBPA: EncargadoBPA[];
  pageActual: number = 1;
  flag: boolean = false;
  contEncargados: number = 0;


  constructor(private encargadoBPAService: EncargadoBPAService,
     private router: Router, private activatedRoute: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {
    this.listaEncargadosService();
  }

  listaEncargadosService() {
    this.encargadoBPAService.getEncargados().subscribe(
      (encargados) => {
        this.encargadosBPA = encargados;  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
        this.contEncargados = encargados.length;
      });
  }

  // listaEncargadosServiceParaCampo(): EncargadoBPA[]{
  //
  //   this.encargadoBPAService.getEncargados().subscribe(
  //     (encargados) => this.encargadosBPA = encargados  //se agrega {this.encargadosBPA = encargados, otra cosa} al this cuando hay mas de una linea de codigo tambien al encargados cuando son mas de 1 parametro
  //   );
  //   return this.encargadosBPA;
  // }

  delete(encargado: EncargadoBPA): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar al Encargado BPA ${encargado.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.encargadoBPAService.deleteEncargado(encargado.run).subscribe(
          response => {
            this.encargadosBPA = this.encargadosBPA.filter(encar => encar !== encargado);
          }
        )
        swalWithBootstrapButtons.fire(
          '¡Encargado BPA eliminado!',
          'El encargado ha sido eliminado con éxito.',
          'success'
        )
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Encargado BPA se canceló',
          'error'
        )
      }
    })
  }

  crear(): void {
    this.encargadoBPAService.crearEncargado(this.encargado).subscribe(
      json => {
        this.router.navigate(['/encargadosBPA'])
        swal.fire('Nuevo Encargado BPA', `El Encargado BPA ${json.encargado.nombre} ha sido creado con éxito`, 'success');
        this.listaEncargadosService();
      }
    )
  }

  update(): void {
    this.encargadoBPAService.updateEncargado(this.encargado).subscribe(
      json => {
        this.router.navigate(['/encargadosBPA']);
        swal.fire('Encargado BPA actualizado', `El Encargado BPA ${json.encargado.nombre} ha sido actualizado con éxito`, 'success');
        this.listaEncargadosService();

      }
    )

  }

  cargarEncargado(run: string): void {
    this.flag = true;
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (run) {
        this.encargadoBPAService.getEncargado(run).subscribe((encargado) => this.encargado = encargado);
      }
    })
  }

  vaciarInputs(formEncargados: NgForm) {
    this.encargado = new EncargadoBPA();
    let pass2 = <HTMLInputElement>document.getElementById('pass2');
    pass2.value = "";
    var p1 = document.getElementById("error");
    var p2 = document.getElementById("ok");
    p1.style.display = "none";
    p2.style.display = "none";
    formEncargados.resetForm();
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
