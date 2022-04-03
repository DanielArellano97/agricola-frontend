import { Injectable } from '@angular/core';
import { RegistroFertilizante } from './registro-fertilizante';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegistroFertilizanteService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFertilizantes';


     constructor(private http: HttpClient, private router:Router) { }


    getRegistrosFertilizantes(): Observable<RegistroFertilizante[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map(response => {
         let regiFertis = response as RegistroFertilizante[];
          return regiFertis.map(regiFerti => {
            regiFerti.estadoFenologico = regiFerti.estadoFenologico.toUpperCase();
            regiFerti.nombreFertilizante = regiFerti.nombreFertilizante.toUpperCase();
            regiFerti.nombreCuartel = regiFerti.nombreCuartel.toUpperCase();
            return regiFerti;
          })
        })
      );
    }

    crearRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante> {
      return this.http.post<RegistroFertilizante>(this.urlEndPoint, registroFertilizante).pipe(
         catchError(e => {
           this.router.navigate["/registrosFertilizantes"];
           console.error(e.error.mensaje);
           swal.fire('Error al crear', e.error.mensaje,'error');
           return throwError(e);
         })
      );

    }

    getRegistroFertilizante(id: any): Observable<RegistroFertilizante> {
      return this.http.get<RegistroFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/registrosFertilizantes"];
           console.error(e.error.mensaje);
           swal.fire('Error al editar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }

    updateRegistroFertilizantes(registroFertilizante: RegistroFertilizante): Observable<RegistroFertilizante>{
      return this.http.put<RegistroFertilizante>(`${this.urlEndPoint}/${registroFertilizante.idRegistro}`, registroFertilizante).pipe(
         catchError(e => {
           this.router.navigate["/registrosFertilizante"];
           console.error(e.error.mensaje);
           swal.fire('Error al editar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }

    deleteRegistroFertilizantes(id: any): Observable<RegistroFertilizante>{
      return this.http.delete<RegistroFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/registrosFertilizante"];
           console.error(e.error.mensaje);
           swal.fire('Error al eliminar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }
}
