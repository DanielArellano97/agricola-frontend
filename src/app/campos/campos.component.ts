import { Component, OnInit } from '@angular/core';
import { Campos } from './campos';
import { EncargadoBPA } from '../encargados-bpa/encargado-bpa';
import { CamposService } from './campos.service';
import { EncargadosBPAComponent } from '../encargados-bpa/encargados-bpa.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministradorService } from '../administrador/administrador.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { Administrador } from '../administrador/administrador';
import { DuenoCampo } from '../dueno-campo/dueno';
import { DuenoService } from '../dueno-campo/dueno.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.css']
})
export class CamposComponent implements OnInit {

  titulo: string = "Crear Campo";
  campo: Campos = new Campos();
  campos: Campos[];
  pageActual: number = 1;
  encargadosBPA: EncargadoBPA[];
  campoEditar: Campos =  new Campos();
  encargados2: EncargadosBPAComponent;
  adminSelect: Observable<Administrador[]> = this.adminService.getAdministradores();
  arraysAdmin: Array<Administrador> = [];
  duenoSelect: Observable<DuenoCampo[]> = this.duenoService.getDuenos();
  arrayDueno: Array<DuenoCampo> = [];
  contCampos: number = 0;

  flag:boolean = true;
  flag2: boolean = false;
  flag3: boolean = true;
  flag4: boolean = false;
  run: string;
  runDueno: string;


  constructor(private campoService: CamposService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdministradorService,
    private duenoService: DuenoService) { }

  ngOnInit(): void {
    this.listaCamposService();
    this.cargarAdmins();
    this.cargarDuenos();
  }

  cargarDuenos(){
    this.duenoSelect.subscribe(duenos => {
      duenos.forEach(dueno =>{
        this.arrayDueno.push(dueno);
      })
    });
  }

  cargarAdmins(){
    this.adminSelect.subscribe(admins => {
      admins.forEach(ad =>{
        this.arraysAdmin.push(ad);
      })
    });
  }


  listaCamposService() {
    this.campoService.getCampos().subscribe(
      (campos) => {
        this.campos = campos
        this.contCampos = campos.length;
      });
    
  }

  delete(campo: Campos): void {

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que desea eliminar el Campo ${campo.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.campoService.deleteCampo(campo.idCampo).subscribe(
          response => {
            this.campos = this.campos.filter(fit => fit !== campo);
          }
        )
        swalWithBootstrapButtons.fire(
          '¡Campo eliminado!',
          `El campo ${campo.nombre} ha sido eliminado.`,
          'success'
        )
        // this.listaCamposService();
      } else if (
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La eliminación del Campo se canceló',
          'error'
        )
      }
    })
  }

//metodo para crearFito junto con sweetAlert
  crear(): void {
    this.campoService.crearCampo(this.campo).subscribe(
      json => {
        this.router.navigate(['/campos'])
        swal.fire('Nuevo Campo', `El campo ${json.campo.nombre} ha sido creado con éxito`, 'success');
        this.listaCamposService();
      }
    )
  }

  update(): void {
    this.campoService.updateCampo(this.campo).subscribe(
      json => {
        this.router.navigate(['/campos']);
        swal.fire('¡Campo actualizado!', `El campo ${this.campo.nombre} ha sido actualizado con éxito`, 'success');
        this.listaCamposService();
      }
    )
  }

//metodo para cargar con datos los inputs del modal de editar fito
  cargarCampo(camp: Campos): void {
    this.run = camp.runAdministradorCampo;
    this.runDueno = camp.runDuenoCampo;
    this.activatedRoute.params.subscribe(params => {
      //let id = params['run'];
      if (camp.idCampo) {
        this.campoService.getCampo(camp.idCampo).subscribe((campo) => {this.campo = campo});

      }
    })
  }

  vaciarInputs(formCampo: NgForm) {
    this.campo = new Campos();
    let select = <HTMLInputElement>document.getElementById("select");
    select.value="";
    let select2 = <HTMLInputElement>document.getElementById("select3");
    select2.value="";
    formCampo.resetForm();
    
  }

  enviarId(value:string){

    if(value != ""){
      this.campo.runAdministradorCampo =  value;
      this.flag = false;
    }else{
      this.flag =true;
    }
  }

  enviarId2(value:string){

    if(value != ""){
      this.campo.runAdministradorCampo =  value;
      this.flag2 = false;
    }else{
      this.flag2 =true;
    }
  }

  enviarId3(value:string){

    if(value != ""){
      this.campo.runDuenoCampo =  value;
      this.flag3 = false;
    }else{
      this.flag3 =true;
    }
  }

  enviarId4(value:string){

    if(value != ""){
      this.campo.runDuenoCampo =  value;
      this.flag4 = false;
    }else{
      this.flag4 =true;
    }
  }

}
