import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { RegistroFitosanitarioService } from '../registro-fitosanitario/registro-fitosanitario.service';
import { RegistroFertilizanteService } from '../registro-fertilizante/registro-fertilizante.service';
import { ProductoFertilizanteService } from '../producto-fertilizante/producto-fertilizante.service';
import { ProductoFitosanitarioService } from '../producto-fitosanitario/producto-fitosanitario.service';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  flagSpinner: boolean = false;
  chartOne: boolean = true;

  anioNowString = "";
  mesNowString = "";
  anioNowNumber: number;
  mesNowNumber: number;
  now = new Date();

  //variables fertilizante
  myChart2: Chart;
  arregloMesesFerti: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  anio: number;
  mes: number;
  anioFiltrarFerti1: number = 2020;
  anioFiltrarFerti2: number = 2021;



  //variables fitosanitario
  myChartFerti: Chart;
  arregloMesesFito: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  anioFito: number;
  mesFito: number;
  anioFiltrarFito1: number = 2020;
  anioFiltrarFito2: number = 2021;


  //variables tipo Fertilizantes
  myChartTipoFertilizante: Chart;
  nitrogeno: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  fosforo: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  potasio: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  calcio: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  magnesio: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  azufre: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  anioFiltrarFertiTipo1: number = 2020;
  anioFiltrarFertiTipo2: number = 2021;
  anioFertiTipo: number;
  mesFertiTipo: number;
  cantidadAplicada: number;


  //variables tipo RegistroFitosanitarioService

  myChartTipoFitosanitario: Chart;
  funjicida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  insecticida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  herbicida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  acaricida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bactericida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  nematicida: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  anioFiltrarFitoTipo1: number = 2020;
  anioFiltrarFitoTipo2: number = 2021;
  anioFitoTipo: number;
  mesFitoTipo: number;
  dosis: number;


  // variables LINEAL
  myChartLineal: Chart;
  arregloMesesLinealFerti: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  anioLinealFerti: number;
  mesLinealFerti: number;
  anioComparativa1: number = 2020;
  anioComparativa2: number = 2021;

  arregloMesesLinealFito: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  anioLinealFito: number;
  mesLinealFito: number;
  anioComparativaFito1: number = 2020;
  anioComparativaFito2: number = 2021;

  constructor(private serviceRegistroFitosanitario: RegistroFitosanitarioService,
    private serviceRegistroFertilizante: RegistroFertilizanteService,
    private serviceFertilizante: ProductoFertilizanteService,
    private serviceFitosanitrio: ProductoFitosanitarioService) {
  }

  ngOnInit(): void {
    this.anioNowString = formatDate(this.now, 'yyyy', 'en-US', '+0530');
    this.mesNowString = formatDate(this.now, 'MM', 'en-US', '+0530');
    this.anioNowNumber = Number(this.anioNowString);
    this.mesNowNumber = Number(this.mesNowString);

    //logica fertilizante
    // if (this.mesNowNumber >= 8) {
    //   this.anioFiltrarFerti1 = this.anioNowNumber;
    //   this.anioFiltrarFerti2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioFiltrarFerti1 = this.anioNowNumber - 1;
    //   this.anioFiltrarFerti2 = this.anioNowNumber;
    // }
    this.serviceFerti();

    //logica fitosanitario
    // if (this.mesNowNumber >= 8) {
    //   this.anioFiltrarFito1 = this.anioNowNumber;
    //   this.anioFiltrarFito2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioFiltrarFito1 = this.anioNowNumber - 1;
    //   this.anioFiltrarFito2 = this.anioNowNumber;
    // }
    this.serviceFito();

    //logica tipo Fertilizante

    // if (this.mesNowNumber >= 8) {
    //   this.anioFiltrarFertiTipo1 = this.anioNowNumber;
    //   this.anioFiltrarFertiTipo2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioFiltrarFertiTipo1 = this.anioNowNumber - 1;
    //   this.anioFiltrarFertiTipo2 = this.anioNowNumber;
    // }
    this.serviceFertiTipo();

    //logica tipo Fitosanitario

    // if (this.mesNowNumber >= 8) {
    //   this.anioFiltrarFitoTipo1 = this.anioNowNumber;
    //   this.anioFiltrarFitoTipo2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioFiltrarFitoTipo1 = this.anioNowNumber - 1;
    //   this.anioFiltrarFitoTipo2 = this.anioNowNumber;
    // }
    this.serviceFitoTipo();


    //logica comparacion
    // if (this.mesNowNumber >= 8) {
    //   this.anioComparativa1 = this.anioNowNumber;
    //   this.anioComparativa2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioComparativa1 = this.anioNowNumber - 1;
    //   this.anioComparativa2 = this.anioNowNumber;
    // }

    // if (this.mesNowNumber >= 8) {
    //   this.anioComparativaFito1 = this.anioNowNumber;
    //   this.anioComparativaFito2 = this.anioNowNumber + 1;
    // } else {
    //   this.anioComparativaFito1 = this.anioNowNumber - 1;
    //   this.anioComparativaFito2 = this.anioNowNumber;
    // }

    this.serviceLineal();
  }

  mostrar1() {
    var z = document.getElementById("chart3");
    var y = document.getElementById("chart2");
    var x = document.getElementById("chart1");
    var t = document.getElementById("chart4");
    var u = document.getElementById("chart5");
    u.style.display = "none";
    t.style.display = "none";
    z.style.display = "none";
    y.style.display = "none";
    x.style.display = "block";
  }

  mostrar2() {
    var y = document.getElementById("chart1");
    var x = document.getElementById("chart2");
    var z = document.getElementById("chart3");
    var t = document.getElementById("chart4");
    var u = document.getElementById("chart5");
    u.style.display = "none";
    t.style.display = "none";
    z.style.display = "none";
    y.style.display = "none";
    x.style.display = "block";
  }

  mostrar3() {
    var y = document.getElementById("chart1");
    var x = document.getElementById("chart2");
    var z = document.getElementById("chart3");
    var t = document.getElementById("chart4");
    var u = document.getElementById("chart5");
    u.style.display = "none";
    t.style.display = "none";
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "block";
  }

  mostrar4() {
    var y = document.getElementById("chart1");
    var x = document.getElementById("chart2");
    var z = document.getElementById("chart3");
    var t = document.getElementById("chart4");
    var u = document.getElementById("chart5");
    u.style.display = "none";
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
    t.style.display = "block"
  }

  mostrar5() {
    var y = document.getElementById("chart1");
    var x = document.getElementById("chart2");
    var z = document.getElementById("chart3");
    var t = document.getElementById("chart4");
    var u = document.getElementById("chart5");
    x.style.display = "none";
    y.style.display = "none";
    z.style.display = "none";
    t.style.display = "none";
    u.style.display = "block";
  }


  //primera parte de graficos solo contando registros

  filtrarFertilizante() { //fertilizante
    // this.chartOne = false;
    // this.flagSpinner = true;
    // setTimeout(() => {
    //   this.chartOne = true;
    //   this.flagSpinner = false;
    // }, 3000);
    if (this.myChart2 != undefined) {
      this.myChart2.destroy();
      this.arregloMesesFerti = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.anio = 0;
      this.mes = 0;
    }
    let anio1 = <HTMLInputElement>document.getElementById("anio1");
    let anio2 = <HTMLInputElement>document.getElementById("anio2");
    this.anioFiltrarFerti1 = Number(anio1.value);
    this.anioFiltrarFerti2 = Number(anio2.value);
    this.serviceFerti();

  }

  serviceFerti() {
    this.serviceRegistroFertilizante.getRegistrosFertilizantes().subscribe(
      (regiFerti) => {
        regiFerti.forEach(element => {
          let date = new Date(element.fecha);
          this.mes = date.getMonth() + 1;
          this.anio = date.getFullYear();
          if (this.anio == this.anioFiltrarFerti1) {
            if (this.mes == 8) {
              this.arregloMesesFerti[0]++;
            } else {
              if (this.mes == 9) {
                this.arregloMesesFerti[1]++;
              } else {
                if (this.mes == 10) {
                  this.arregloMesesFerti[2]++;
                } else {
                  if (this.mes == 11) {
                    this.arregloMesesFerti[3]++;
                  } else {
                    if (this.mes == 12) {
                      this.arregloMesesFerti[4]++;
                    }
                  }
                }
              }
            }
          }
          if (this.anio == this.anioFiltrarFerti2) {
            if (this.mes == 1) {
              this.arregloMesesFerti[5]++;
            } else {
              if (this.mes == 2) {
                this.arregloMesesFerti[6]++;
              } else {
                if (this.mes == 3) {
                  this.arregloMesesFerti[7]++;
                } else {
                  if (this.mes == 4) {
                    this.arregloMesesFerti[8]++;
                  } else {
                    if (this.mes == 5) {
                      this.arregloMesesFerti[9]++;
                    }
                  }
                }
              }
            }
          }
        });
        this.graficoBarrasFertilizante();
      });
  }

  graficoBarrasFertilizante() {
    this.myChart2 = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'N° de Registros Fertilizantes',
          data: this.arregloMesesFerti,
          backgroundColor: [
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',

            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)',
            'rgba(22, 160, 133, 0.7)'
          ],
          borderColor: [
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',

            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)',
            'rgba(22, 160, 133, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  filtrarFitosanitario() {
    if (this.myChartFerti != undefined) {
      this.myChartFerti.destroy();
      this.arregloMesesFito = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.anioFito = 0;
      this.mesFito = 0;
    }
    let anio1 = <HTMLInputElement>document.getElementById("anio1Fito");
    let anio2 = <HTMLInputElement>document.getElementById("anio2Fito");
    this.anioFiltrarFito1 = Number(anio1.value);
    this.anioFiltrarFito2 = Number(anio2.value);
    this.serviceFito();
  }

  serviceFito() {
    this.serviceRegistroFitosanitario.getRegistrosFito().subscribe(
      (regiFito) => {
        regiFito.forEach(element => {
          let date = new Date(element.fecha);
          this.mesFito = date.getMonth() + 1;
          this.anioFito = date.getFullYear();
          if (this.anioFito == this.anioFiltrarFito1) {
            if (this.mesFito == 8) {
              this.arregloMesesFito[0]++;
            } else {
              if (this.mesFito == 9) {
                this.arregloMesesFito[1]++;
              } else {
                if (this.mesFito == 10) {
                  this.arregloMesesFito[2]++;
                } else {
                  if (this.mesFito == 11) {
                    this.arregloMesesFito[3]++;
                  } else {
                    if (this.mesFito == 12) {
                      this.arregloMesesFito[4]++;
                    }
                  }
                }
              }
            }
          }
          if (this.anioFito == this.anioFiltrarFito2) {
            if (this.mesFito == 1) {
              this.arregloMesesFito[5]++;
            } else {
              if (this.mesFito == 2) {
                this.arregloMesesFito[6]++;
              } else {
                if (this.mesFito == 3) {
                  this.arregloMesesFito[7]++;
                } else {
                  if (this.mesFito == 4) {
                    this.arregloMesesFito[8]++;
                  } else {
                    if (this.mesFito == 5) {
                      this.arregloMesesFito[9]++;
                    }
                  }
                }
              }
            }
          }
        });
        this.graficoBarraFitosanitarios();
      });
  }

  graficoBarraFitosanitarios() {
    this.myChartFerti = new Chart("myChart2", {
      type: 'bar',
      data: {
        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'N° de Registros Fitosanitarios',
          data: this.arregloMesesFito,
          backgroundColor: [
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',

            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)'
          ],
          borderColor: [
            'rgba(250, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',

            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)',
            'rgba(236, 130, 24, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



  //segunda parte de graficos contando tipos;

  filtrarFertilizanteTipo() {
    if (this.myChartTipoFertilizante != undefined) {
      this.myChartTipoFertilizante.destroy();
      this.nitrogeno = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.fosforo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.potasio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.calcio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.magnesio = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.azufre = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      this.anioFertiTipo = 0;
      this.mesFertiTipo = 0;
    }

    let anio1 = <HTMLInputElement>document.getElementById("anio1FertiTipo");
    let anio2 = <HTMLInputElement>document.getElementById("anio2FertiTipo");
    this.anioFiltrarFertiTipo1 = Number(anio1.value);
    this.anioFiltrarFertiTipo2 = Number(anio2.value);
    this.serviceFertiTipo();
  }

  serviceFertiTipo() {
    this.serviceRegistroFertilizante.getRegistrosFertilizantes().subscribe(
      (regiFerti) => {
        regiFerti.forEach(async (element, index) => {
          let tipo = await this.tipoFertilizante(element.idFertilizante);
          this.cantidadAplicada = element.cantidadAplicada;
          let date = new Date(element.fecha);
          this.mesFertiTipo = date.getMonth() + 1;
          this.anioFertiTipo = date.getFullYear();
          if (this.anioFertiTipo == this.anioFiltrarFertiTipo1) {

            if (this.mesFertiTipo == 8) {
              switch (tipo) {
                case "Nitrógeno": {
                  this.nitrogeno[0] += this.cantidadAplicada;
                  break;
                }
                case "Fósforo": {
                  this.fosforo[0] += this.cantidadAplicada;
                  break;
                }
                case "Potasio": {
                  this.potasio[0] += this.cantidadAplicada;
                  break;
                }
                case "Calcio": {
                  this.calcio[0] += this.cantidadAplicada;
                  break;
                }
                case "Magnesio": {
                  this.magnesio[0] += this.cantidadAplicada;
                  break;
                }
                case "Azufre": {
                  this.azufre[0] += this.cantidadAplicada;
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              if (this.mesFertiTipo == 9) {
                switch (tipo) {
                  case "Nitrógeno": {
                    this.nitrogeno[1] += this.cantidadAplicada;
                    break;
                  }
                  case "Fósforo": {
                    this.fosforo[1] += this.cantidadAplicada;
                    break;
                  }
                  case "Potasio": {
                    this.potasio[1] += this.cantidadAplicada;
                    break;
                  }
                  case "Calcio": {
                    this.calcio[1] += this.cantidadAplicada;
                    break;
                  }
                  case "Magnesio": {
                    this.magnesio[1] += this.cantidadAplicada;
                    break;
                  }
                  case "Azufre": {
                    this.azufre[1] += this.cantidadAplicada;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              } else {
                if (this.mesFertiTipo == 10) {
                  switch (tipo) {
                    case "Nitrógeno": {
                      this.nitrogeno[2] += this.cantidadAplicada;
                      break;
                    }
                    case "Fósforo": {
                      this.fosforo[2] += this.cantidadAplicada;
                      break;
                    }
                    case "Potasio": {
                      this.potasio[2] += this.cantidadAplicada;
                      break;
                    }
                    case "Calcio": {
                      this.calcio[2] += this.cantidadAplicada;
                      break;
                    }
                    case "Magnesio": {
                      this.magnesio[2] += this.cantidadAplicada;
                      break;
                    }
                    case "Azufre": {
                      this.azufre[2] += this.cantidadAplicada;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                } else {
                  if (this.mesFertiTipo == 11) {
                    switch (tipo) {
                      case "Nitrógeno": {
                        this.nitrogeno[3] += this.cantidadAplicada;
                        break;
                      }
                      case "Fósforo": {
                        this.fosforo[3] += this.cantidadAplicada;
                        break;
                      }
                      case "Potasio": {
                        this.potasio[3] += this.cantidadAplicada;
                        break;
                      }
                      case "Calcio": {
                        this.calcio[3] += this.cantidadAplicada;
                        break;
                      }
                      case "Magnesio": {
                        this.magnesio[3] += this.cantidadAplicada;
                        break;
                      }
                      case "Azufre": {
                        this.azufre[3] += this.cantidadAplicada;
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  } else {
                    if (this.mesFertiTipo == 12) {
                      switch (tipo) {
                        case "Nitrógeno": {
                          this.nitrogeno[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Fósforo": {
                          this.fosforo[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Potasio": {
                          this.potasio[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Calcio": {
                          this.calcio[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Magnesio": {
                          this.magnesio[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Azufre": {
                          this.azufre[4] += this.cantidadAplicada;
                          break;
                        }
                        default: {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (this.anioFertiTipo == this.anioFiltrarFertiTipo2) {

            if (this.mesFertiTipo == 1) {
              switch (tipo) {
                case "Nitrógeno": {
                  this.nitrogeno[5] += this.cantidadAplicada;
                  break;
                }
                case "Fósforo": {
                  this.fosforo[5] += this.cantidadAplicada;
                  break;
                }
                case "Potasio": {
                  this.potasio[5] += this.cantidadAplicada;
                  break;
                }
                case "Calcio": {
                  this.calcio[5] += this.cantidadAplicada;
                  break;
                }
                case "Magnesio": {
                  this.magnesio[5] += this.cantidadAplicada;
                  break;
                }
                case "Azufre": {
                  this.azufre[5] += this.cantidadAplicada;
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              if (this.mesFertiTipo == 2) {
                switch (tipo) {
                  case "Nitrógeno": {
                    this.nitrogeno[6] += this.cantidadAplicada;
                    break;
                  }
                  case "Fósforo": {
                    this.fosforo[6] += this.cantidadAplicada;
                    break;
                  }
                  case "Potasio": {
                    this.potasio[6] += this.cantidadAplicada;
                    break;
                  }
                  case "Calcio": {
                    this.calcio[6] += this.cantidadAplicada;
                    break;
                  }
                  case "Magnesio": {
                    this.magnesio[6] += this.cantidadAplicada;
                    break;
                  }
                  case "Azufre": {
                    this.azufre[6] += this.cantidadAplicada;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              } else {
                if (this.mesFertiTipo == 3) {
                  switch (tipo) {
                    case "Nitrógeno": {
                      this.nitrogeno[7] += this.cantidadAplicada;
                      break;
                    }
                    case "Fósforo": {
                      this.fosforo[7] += this.cantidadAplicada;
                      break;
                    }
                    case "Potasio": {
                      this.potasio[7] += this.cantidadAplicada;
                      break;
                    }
                    case "Calcio": {
                      this.calcio[7] += this.cantidadAplicada;
                      break;
                    }
                    case "Magnesio": {
                      this.magnesio[7] += this.cantidadAplicada;
                      break;
                    }
                    case "Azufre": {
                      this.azufre[7] += this.cantidadAplicada;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                } else {
                  if (this.mesFertiTipo == 4) {
                    switch (tipo) {
                      case "Nitrógeno": {
                        this.nitrogeno[8] += this.cantidadAplicada;
                        break;
                      }
                      case "Fósforo": {
                        this.fosforo[8] += this.cantidadAplicada;
                        break;
                      }
                      case "Potasio": {
                        this.potasio[8] += this.cantidadAplicada;
                        break;
                      }
                      case "Calcio": {
                        this.calcio[8] += this.cantidadAplicada;
                        break;
                      }
                      case "Magnesio": {
                        this.magnesio[8] += this.cantidadAplicada;
                        break;
                      }
                      case "Azufre": {
                        this.azufre[8] += this.cantidadAplicada;
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  } else {
                    if (this.mesFertiTipo == 5) {
                      switch (tipo) {
                        case "Nitrógeno": {
                          this.nitrogeno[9] += this.cantidadAplicada;
                          break;
                        }
                        case "Fósforo": {
                          this.fosforo[9] += this.cantidadAplicada;
                          break;
                        }
                        case "Potasio": {
                          this.potasio[9] += this.cantidadAplicada;
                          break;
                        }
                        case "Calcio": {
                          this.calcio[9] += this.cantidadAplicada;
                          break;
                        }
                        case "Magnesio": {
                          this.magnesio[9] += this.cantidadAplicada;
                          break;
                        }
                        case "Azufre": {
                          this.azufre[9] += this.cantidadAplicada;
                          break;
                        }
                        default: {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (index == regiFerti.length - 1) {
            this.graficoBarraTipoFertilizante();
          }
        });

      });
  }

  async tipoFertilizante(id: number): Promise<string> {
    const tipo: string = await this.serviceFertilizante.getFertilizante(id)
      .toPromise()
      .then((fer) => fer.tipo)
      .catch((err) => "jeje");
    return tipo;
  }

  graficoBarraTipoFertilizante() {
    this.myChartTipoFertilizante = new Chart("myChart3", {
      type: 'bar',
      data: {
        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Nitrógeno',
          data: this.nitrogeno,
          backgroundColor: [
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',

            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)'
          ],
          borderColor: [
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',

            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)'
          ],
          borderWidth: 3
        }, {
          label: 'Fósforo',
          data: this.fosforo,
          backgroundColor: [
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',

            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)'
          ],
          borderColor: [
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',

            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)'
          ],
          borderWidth: 3
        }, {
          label: 'Potasio',
          data: this.potasio,
          backgroundColor: [
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',

            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)'
          ],
          borderColor: [
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',

            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)'
          ],
          borderWidth: 3
        }, {
          label: 'Calcio',
          data: this.calcio,
          backgroundColor: [
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',

            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)'
          ],
          borderColor: [
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',

            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)'
          ],
          borderWidth: 3
        }, {
          label: 'Magnesio',
          data: this.magnesio,
          backgroundColor: [
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',

            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)'
          ],
          borderColor: [
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',

            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)'
          ],
          borderWidth: 3
        }, {
          label: 'Azufre',
          data: this.azufre,
          backgroundColor: [
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',

            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)',
            'rgba(0, 83, 171, 0.7)'
          ],
          borderColor: [
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',

            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)',
            'rgba(0, 83, 171, 1)'
          ],
          borderWidth: 3
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  //segunda parte de graficos contando Tipos

  filtrarFitoTipo() {
    if (this.myChartTipoFitosanitario != undefined) {
      this.myChartTipoFitosanitario.destroy();
      this.funjicida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.insecticida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.herbicida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.acaricida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.bactericida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.nematicida = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      this.mesFitoTipo = 0;
      this.anioFitoTipo = 0;
    }

    let anio1 = <HTMLInputElement>document.getElementById("anio1FitoTipo");
    let anio2 = <HTMLInputElement>document.getElementById("anio2FitoTipo");
    this.anioFiltrarFitoTipo1 = Number(anio1.value);
    this.anioFiltrarFitoTipo2 = Number(anio2.value);
    this.serviceFitoTipo();
  }

  serviceFitoTipo() {
    this.serviceRegistroFitosanitario.getRegistrosFito().subscribe(
      (regiFito) => {
        regiFito.forEach(async (element, index) => {
          let tipo = await this.tipoFitosanitario(element.idFitosanitario);
          this.dosis = element.dosis;
          let date = new Date(element.fecha);
          this.mesFitoTipo = date.getMonth() + 1;
          this.anioFitoTipo = date.getFullYear();
          if (this.anioFitoTipo == this.anioFiltrarFitoTipo1) {
            if (this.mesFitoTipo == 8) {
              switch (tipo) {
                case "Fungicida": {
                  this.funjicida[0] += this.dosis;
                  break;
                }
                case "Insecticida": {
                  this.insecticida[0] += this.dosis;
                  break;
                }
                case "Herbicida": {
                  this.herbicida[0] += this.dosis;
                  break;
                }
                case "Acaricida": {
                  this.acaricida[0] += this.dosis;
                  break;
                }
                case "Bactericida": {
                  this.bactericida[0] += this.dosis;
                  break;
                }
                case "Nematicida": {
                  this.nematicida[0] += this.dosis;
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              if (this.mesFitoTipo == 9) {
                switch (tipo) {
                  case "Fungicida": {
                    this.funjicida[1] += this.dosis;
                    break;
                  }
                  case "Insecticida": {
                    this.insecticida[1] += this.dosis;
                    break;
                  }
                  case "Herbicida": {
                    this.herbicida[1] += this.dosis;
                    break;
                  }
                  case "Acaricida": {
                    this.acaricida[1] += this.dosis;
                    break;
                  }
                  case "Bactericida": {
                    this.bactericida[1] += this.dosis;
                    break;
                  }
                  case "Nematicida": {
                    this.nematicida[1] += this.dosis;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              } else {
                if (this.mesFitoTipo == 10) {
                  switch (tipo) {
                    case "Fungicida": {
                      this.funjicida[2] += this.dosis;
                      break;
                    }
                    case "Insecticida": {
                      this.insecticida[2] += this.dosis;
                      break;
                    }
                    case "Herbicida": {
                      this.herbicida[2] += this.dosis;
                      break;
                    }
                    case "Acaricida": {
                      this.acaricida[2] += this.dosis;
                      break;
                    }
                    case "Bactericida": {
                      this.bactericida[2] += this.dosis;
                      break;
                    }
                    case "Nematicida": {
                      this.nematicida[2] += this.dosis;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                } else {
                  if (this.mesFitoTipo == 11) {
                    switch (tipo) {
                      case "Fungicida": {
                        this.funjicida[3] += this.dosis;
                        break;
                      }
                      case "Insecticida": {
                        this.insecticida[3] += this.dosis;
                        break;
                      }
                      case "Herbicida": {
                        this.herbicida[3] += this.dosis;
                        break;
                      }
                      case "Acaricida": {
                        this.acaricida[3] += this.dosis;
                        break;
                      }
                      case "Bactericida": {
                        this.bactericida[3] += this.dosis;
                        break;
                      }
                      case "Nematicida": {
                        this.nematicida[3] += this.dosis;
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  } else {
                    if (this.mesFitoTipo == 12) {
                      switch (tipo) {
                        case "Fungicida": {
                          this.funjicida[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Insecticida": {
                          this.insecticida[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Herbicida": {
                          this.herbicida[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Acaricida": {
                          this.acaricida[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Bactericida": {
                          this.bactericida[4] += this.cantidadAplicada;
                          break;
                        }
                        case "Nematicida": {
                          this.nematicida[4] += this.dosis;
                          break;
                        }
                        default: {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (this.anioFitoTipo == this.anioFiltrarFitoTipo2) {

            if (this.mesFitoTipo == 1) {
              switch (tipo) {
                case "Fungicida": {
                  this.funjicida[5] += this.dosis;
                  break;
                }
                case "Insecticida": {
                  this.insecticida[5] += this.dosis;
                  break;
                }
                case "Herbicida": {
                  this.herbicida[5] += this.dosis;
                  break;
                }
                case "Acaricida": {
                  this.acaricida[5] += this.dosis;
                  break;
                }
                case "Bactericida": {
                  this.bactericida[5] += this.dosis;
                  break;
                }
                case "Nematicida": {
                  this.nematicida[5] += this.dosis;
                  break;
                }
                default: {
                  break;
                }
              }
            } else {
              if (this.mesFitoTipo == 2) {
                switch (tipo) {
                  case "Fungicida": {
                    this.funjicida[6] += this.dosis;
                    break;
                  }
                  case "Insecticida": {
                    this.insecticida[6] += this.dosis;
                    break;
                  }
                  case "Herbicida": {
                    this.herbicida[6] += this.dosis;
                    break;
                  }
                  case "Acaricida": {
                    this.acaricida[6] += this.dosis;
                    break;
                  }
                  case "Bactericida": {
                    this.bactericida[6] += this.dosis;
                    break;
                  }
                  case "Nematicida": {
                    this.nematicida[6] += this.dosis;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              } else {
                if (this.mesFitoTipo == 3) {
                  switch (tipo) {
                    case "Fungicida": {
                      this.funjicida[7] += this.dosis;
                      break;
                    }
                    case "Insecticida": {
                      this.insecticida[7] += this.dosis;
                      break;
                    }
                    case "Herbicida": {
                      this.herbicida[7] += this.dosis;
                      break;
                    }
                    case "Acaricida": {
                      this.acaricida[7] += this.dosis;
                      break;
                    }
                    case "Bactericida": {
                      this.bactericida[7] += this.dosis;
                      break;
                    }
                    case "Nematicida": {
                      this.nematicida[7] += this.dosis;
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                } else {
                  if (this.mesFitoTipo == 4) {
                    switch (tipo) {
                      case "Fungicida": {
                        this.funjicida[8] += this.dosis;
                        break;
                      }
                      case "Insecticida": {
                        this.insecticida[8] += this.dosis;
                        break;
                      }
                      case "Herbicida": {
                        this.herbicida[8] += this.dosis;
                        break;
                      }
                      case "Acaricida": {
                        this.acaricida[8] += this.dosis;
                        break;
                      }
                      case "Bactericida": {
                        this.bactericida[8] += this.dosis;
                        break;
                      }
                      case "Nematicida": {
                        this.nematicida[8] += this.dosis;
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  } else {
                    if (this.mesFitoTipo == 5) {
                      switch (tipo) {
                        case "Fungicida": {
                          this.funjicida[9] += this.dosis;
                          break;
                        }
                        case "Insecticida": {
                          this.insecticida[9] += this.dosis;
                          break;
                        }
                        case "Herbicida": {
                          this.herbicida[9] += this.dosis;
                          break;
                        }
                        case "Acaricida": {
                          this.acaricida[9] += this.dosis;
                          break;
                        }
                        case "Bactericida": {
                          this.bactericida[9] += this.dosis;
                          break;
                        }
                        case "Nematicida": {
                          this.nematicida[9] += this.dosis;
                          break;
                        }
                        default: {
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (index == regiFito.length - 1) {
            this.graficoBarraTipoFitosanitario();
          }
        });

      });
  }

  async tipoFitosanitario(id: number): Promise<string> {
    const tipo: string = await this.serviceFitosanitrio.getFitosanitario(id)
      .toPromise()
      .then((fito) => fito.tipo)
      .catch((err) => "jeje");
    return tipo;
  }

  graficoBarraTipoFitosanitario() {
    this.myChartTipoFitosanitario = new Chart("myChart4", {
      type: 'bar',
      data: {
        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'Fungicida',
          data: this.funjicida,
          backgroundColor: [
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',

            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)',
            'rgba(18, 115, 35, 0.7)'
          ],
          borderColor: [
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',

            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)',
            'rgba(18, 115, 35, 1)'
          ],
          borderWidth: 1.5
        }, {
          label: 'Insecticida',
          data: this.insecticida,
          backgroundColor: [
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',

            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)',
            'rgba(152, 15, 11, 0.7)'
          ],
          borderColor: [
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',

            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)',
            'rgba(152, 15, 11, 1)'
          ],
          borderWidth: 1.5
        }, {
          label: 'Herbicida',
          data: this.herbicida,
          backgroundColor: [
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',

            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)',
            'rgba(69, 213, 6, 0.7)'
          ],
          borderColor: [
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',

            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)',
            'rgba(69, 213, 6, 1)'
          ],
          borderWidth: 1.5
        }, {
          label: 'Acaricida',
          data: this.acaricida,
          backgroundColor: [
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',

            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)',
            'rgba(236, 172, 24, 0.7)'
          ],
          borderColor: [
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',

            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)',
            'rgba(236, 172, 24, 1)'
          ],
          borderWidth: 1.5
        }, {
          label: 'Bactericida',
          data: this.bactericida,
          backgroundColor: [
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',

            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)',
            'rgba(0, 227, 227, 0.7)'
          ],
          borderColor: [
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',

            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)',
            'rgba(0, 227, 227, 1)'
          ],
          borderWidth: 1.5
        },{
          label: 'Nematicida',
          data: this.nematicida,
          backgroundColor: [
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',

            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)',
            'rgba(22, 61, 183, 0.7)'
          ],
          borderColor: [
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',

            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)',
            'rgba(22, 61, 183, 1)'
          ],
          borderWidth: 1.5}
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {

            },
            beginAtZero: true
          }
        }
      }
    });
  }


  //GRAFICO LINEAL
  filtrarLineal() { //fertilizante
    if (this.myChartLineal != undefined) {
      this.myChartLineal.destroy();

      this.arregloMesesLinealFerti = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.anioLinealFerti = 0;
      this.mesLinealFerti = 0;

      this.arregloMesesLinealFito = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.anioLinealFito = 0;
      this.mesLinealFito = 0;
    }
    let anio1 = <HTMLInputElement>document.getElementById("anio1comparativa");
    let anio2 = <HTMLInputElement>document.getElementById("anio2comparativa");

    let anio3 = <HTMLInputElement>document.getElementById("anio3comparativa");
    let anio4 = <HTMLInputElement>document.getElementById("anio4comparativa");

    this.anioComparativa1 = Number(anio1.value);
    this.anioComparativa2 = Number(anio2.value);

    this.anioComparativaFito1 = Number(anio3.value);
    this.anioComparativaFito2 = Number(anio4.value);
    this.serviceLineal();
  }

  serviceLineal() {
    this.serviceRegistroFertilizante.getRegistrosFertilizantes().subscribe(
      (regiFerti) => {
        regiFerti.forEach(element => {
          let date = new Date(element.fecha);
          this.mesLinealFerti = date.getMonth() + 1;
          this.anioLinealFerti = date.getFullYear();
          if (this.anioLinealFerti == this.anioComparativa1) {
            if (this.mesLinealFerti == 8) {
              this.arregloMesesLinealFerti[0]++;
            } else {
              if (this.mesLinealFerti == 9) {
                this.arregloMesesLinealFerti[1]++;
              } else {
                if (this.mesLinealFerti == 10) {
                  this.arregloMesesLinealFerti[2]++;
                } else {
                  if (this.mesLinealFerti == 11) {
                    this.arregloMesesLinealFerti[3]++;
                  } else {
                    if (this.mesLinealFerti == 12) {
                      this.arregloMesesLinealFerti[4]++;
                    }
                  }
                }
              }
            }
          }
          if (this.anioLinealFerti == this.anioComparativa2) {
            if (this.mesLinealFerti == 1) {
              this.arregloMesesLinealFerti[5]++;
            } else {
              if (this.mesLinealFerti == 2) {
                this.arregloMesesLinealFerti[6]++;
              } else {
                if (this.mesLinealFerti == 3) {
                  this.arregloMesesLinealFerti[7]++;
                } else {
                  if (this.mesLinealFerti == 4) {
                    this.arregloMesesLinealFerti[8]++;
                  } else {
                    if (this.mesLinealFerti == 5) {
                      this.arregloMesesLinealFerti[9]++;
                    }
                  }
                }
              }
            }
          }
        });

        this.serviceRegistroFitosanitario.getRegistrosFito().subscribe(
          (regiFito) => {
            regiFito.forEach(element => {
              let date = new Date(element.fecha);
              this.mesLinealFito = date.getMonth() + 1;
              this.anioLinealFito = date.getFullYear();
              if (this.anioLinealFito == this.anioComparativaFito1) {
                if (this.mesLinealFito == 8) {
                  this.arregloMesesLinealFito[0]++;
                } else {
                  if (this.mesLinealFito == 9) {
                    this.arregloMesesLinealFito[1]++;
                  } else {
                    if (this.mesLinealFito == 10) {
                      this.arregloMesesLinealFito[2]++;
                    } else {
                      if (this.mesLinealFito == 11) {
                        this.arregloMesesLinealFito[3]++;
                      } else {
                        if (this.mesLinealFito == 12) {
                          this.arregloMesesLinealFito[4]++;
                        }
                      }
                    }
                  }
                }
              }
              if (this.anioLinealFito == this.anioComparativaFito2) {
                if (this.mesLinealFito == 1) {
                  this.arregloMesesLinealFito[5]++;
                } else {
                  if (this.mesLinealFito == 2) {
                    this.arregloMesesLinealFito[6]++;
                  } else {
                    if (this.mesLinealFito == 3) {
                      this.arregloMesesLinealFito[7]++;
                    } else {
                      if (this.mesLinealFito == 4) {
                        this.arregloMesesLinealFito[8]++;
                      } else {
                        if (this.mesLinealFito == 5) {
                          this.arregloMesesLinealFito[9]++;
                        }
                      }
                    }
                  }
                }
              }
            });
            this.graficoLineal();
          });
      });

  }

  graficoLineal() {
    this.myChartLineal = new Chart("myChart5", {
      type: 'line',
      data: {
        labels: ['Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [{
          label: 'N° de Registros Fertilizantes',
          borderColor: 'red',
          data: this.arregloMesesLinealFerti
        }, {
          label: 'N° de Registros Fitosanitarios',
          borderColor: 'blue',
          data: this.arregloMesesLinealFito
        }]
      }
    });
  }

}
