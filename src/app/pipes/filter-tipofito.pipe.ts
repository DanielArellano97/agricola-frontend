import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipofito'
})
export class FilterTipofitoPipe implements PipeTransform {


    
    transform(value: any, arg: any): any {
    
      const resultRegistros =[];
      if(!value){
        return [];
      }
      for(const registros of value){
          if(registros.nombreFitosanitario.indexOf(arg.toUpperCase())> -1){
              resultRegistros.push(registros);
          }
      }
      return resultRegistros;
    }
  }



