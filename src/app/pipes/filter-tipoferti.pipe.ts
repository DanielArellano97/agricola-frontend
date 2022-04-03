import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTipoferti'
})
export class FilterTipofertiPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    
    const resultRegistros =[];
    if(!value){
      return [];
    }
    for(const registros of value){
        if(registros.nombreFertilizante.indexOf(arg.toUpperCase())> -1){
            resultRegistros.push(registros);
        }
    }
    return resultRegistros;
  }

}
