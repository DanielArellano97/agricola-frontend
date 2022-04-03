import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

   transform(value: any, arg: any): any {
    
    const resultRegistros =[];
    if(!value){
      return [];
    }
    for(const registros of value){
        if(registros.fecha.indexOf(arg)> -1){
            resultRegistros.push(registros);
        }
    }
    return resultRegistros;
  }
   
 
}
