import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class FilterPipe implements PipeTransform {

   transform(value: any, arg: any): any {
    
    const resultRegistros =[];
    if(!value){
      return [];
    }
    for(const registrosFitosanitarios of value){
        if(registrosFitosanitarios.fecha.indexOf(arg)> -1){
            resultRegistros.push(registrosFitosanitarios);
        }
    }
    return resultRegistros;
  }
   
 
}
