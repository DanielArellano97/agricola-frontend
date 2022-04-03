import { Component, OnInit } from '@angular/core';
import { CuartelService } from '../cuartel/cuartel.service';
import { Cuartel } from '../cuartel/cuartel';
import { PredioService } from '../predio/predio.service';
import { Predio } from '../predio/predio';
import { CamposService } from '../campos/campos.service';
import { Campos } from '../campos/campos';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cuartelSelect: Observable<Cuartel[]> = this.cuartelService.getCuarteles();
  arraysCuarteles: Array<Cuartel> = [];

  predioSelect: Observable<Predio[]> = this.predioService.getPredios();
  arraysPredios: Array<Predio> = [];

  camposSelect: Observable<Campos[]> = this.campoService.getCampos();
  arraysCampos: Array<Campos> = [];

  constructor(private cuartelService: CuartelService, private predioService: PredioService, private campoService: CamposService) { }

  ngOnInit(): void {
    this.cargarCuarteles();
    this.cargarPredios();
    this.cargarCampos();
  }


  cargarCuarteles(){
    this.cuartelSelect.subscribe(cuarteles => {
      cuarteles.forEach(cuartel =>{
        this.arraysCuarteles.push(cuartel);
      })
    });
  }

  cargarPredios(){
    this.predioSelect.subscribe(predios => {
      predios.forEach(predio =>{
        this.arraysPredios.push(predio);
      })
    });
  }

  cargarCampos(){
    this.camposSelect.subscribe(campos => {
      campos.forEach(campo =>{
        this.arraysCampos.push(campo);
      })
    });
  }

}
