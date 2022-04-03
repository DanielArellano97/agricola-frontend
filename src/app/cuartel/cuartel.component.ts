import { Component, OnInit } from '@angular/core';
import { Cuartel} from './cuartel';
import { CuartelService } from './cuartel.service';
import { EncargadoBPAService } from '../encargados-bpa/encargado-bpa.service';
import { EncargadoBPA } from '../encargados-bpa/encargado-bpa';
import { PredioService } from '../predio/predio.service';
import { Predio } from '../predio/predio';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/internal/Observable';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cuartel',
  templateUrl: './cuartel.component.html',
  styleUrls: ['./cuartel.component.css']
})
export class CuartelComponent implements OnInit {

  pageActual: number = 1;
  
  flag:boolean =true;
  flag2:boolean =true;
  flag3:boolean =false;
  flag4:boolean =false;
  contCuarteles: number = 0;
  
  runEncargado: String;
  idPredio: number;

  cuartel:Cuartel = new Cuartel();
  cuarteles: Cuartel[];

  encargadosSelect:Observable<EncargadoBPA[]> = this.encargadoBPAService.getEncargados();
  arrayEncargados:Array<EncargadoBPA> = [];

  prediosSelect:Observable<Predio[]> = this.predioService.getPredios();
  arrayPredios:Array<Predio> = [];

constructor(private cuartelService: CuartelService, private router: Router,
  private activatedRoute: ActivatedRoute, private encargadoBPAService:EncargadoBPAService,
   private predioService:PredioService) { }

  ngOnInit(): void {
    this.listaCuartelesService();
    this.cargarEncargados();
    this.cargarPredios();

  }

  cargarPredios(){
    this.prediosSelect.subscribe(
      pre =>{
        pre.forEach(predio =>{
          this.arrayPredios.push(predio);
        })
      })
  }
  cargarEncargados(){
    this.encargadosSelect.subscribe(
      enc =>{
        enc.forEach(encargado =>{
          this.arrayEncargados.push(encargado);
        })
      })
  }

  listaCuartelesService() {
     this.cuartelService.getCuarteles().subscribe(
       (cuarteles) => {
         this.cuarteles = cuarteles;
         this.contCuarteles = cuarteles.length;
       });
   }

   delete(cuartel: Cuartel): void {
     const swalWithBootstrapButtons = swal.mixin({
       customClass: {
         confirmButton: 'btn btn-success',
         cancelButton: 'btn btn-danger'
       },
       buttonsStyling: false
     })

     swalWithBootstrapButtons.fire({
       title: '¿Estas seguro?',
       text: `¿Seguro que desea eliminar el Cuartel ${cuartel.nombre}?`,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Si, estoy seguro',
       cancelButtonText: 'No, cancelar',
       reverseButtons: true
     }).then((result) => {
       if (result.isConfirmed) {
         this.cuartelService.deleteCuartel(cuartel.idCuartel).subscribe(
           response => {
             this.cuarteles = this.cuarteles.filter(cua => cua !== cuartel);
           }
         )
         swalWithBootstrapButtons.fire(
           'Cuartel eliminado!',
           'El Cuartel ha sido eliminado.',
           'success'
         )
       } else if (
         result.dismiss === swal.DismissReason.cancel
       ) {
         swalWithBootstrapButtons.fire(
           'Cancelado',
           'La eliminación del Cuartel se canceló',
           'error'
         )
       }
     })
   }

   crear(): void {
     this.cuartelService.crearCuartel(this.cuartel).subscribe(
       cuartel => {
         this.router.navigate(['/cuarteles'])
         swal.fire('Nuevo Cuartel', `El Cuartel ${this.cuartel.nombre}, ha sido creado con éxito`, 'success');
         this.listaCuartelesService();
       }
     )
   }

   update(): void {
     console.log(this.cuartel);
     this.cuartelService.updateCuartel(this.cuartel).subscribe(
      
      (json) => {
         this.router.navigate(['/cuarteles']);
         swal.fire('Cuartel actualizado', `El Cuartel ${this.cuartel.nombre}, ha sido actualizado con éxito`, 'success');
         this.listaCuartelesService();
       }
     );
     
   }

   cargarCuartel(cuartel: Cuartel): void {

     this.runEncargado=cuartel.runEncargadoBPA;
     this.idPredio=cuartel.idPredio;
     this.activatedRoute.params.subscribe(params => {
       
       if (cuartel.idCuartel) {
         this.cuartelService.getCuartel(cuartel.idCuartel).subscribe((cuartel) => this.cuartel = cuartel);
       }
     })
   }

   //metodo que vacia el form para crear
   vaciarInputs(formCuartel: NgForm) {
     this.cuartel = new Cuartel();
     let select1 = <HTMLInputElement>document.getElementById("select");
    select1.value="";
    let select2 = <HTMLInputElement>document.getElementById("select2");
    select2.value="";
    formCuartel.resetForm();
   }

   enviarId(value:string){
     if(value != ""){
       this.cuartel.runEncargadoBPA = value;
       this.flag = false;
     }else{
       this.flag =true;
     }
   }
   enviarId2(value:string){
     if(value != ""){
       this.cuartel.idPredio = Number(value);
       this.flag2 = false;
     }else{
       this.flag2 =true;
     }
   }
   enviarId3(value:string){
    if(value != ""){
      this.cuartel.runEncargadoBPA =value;
      this.flag3 = false;
    }else{
      this.flag3 =true;
    }
  }
  enviarId4(value:string){
    if(value != ""){
      this.cuartel.idPredio = Number(value);
      this.flag4 = false;
    }else{
      this.flag4 =true;
    }
  }
}
