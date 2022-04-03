import { Injectable } from '@angular/core';
import {Cuartel} from './cuartel';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CuartelService {

  urlEndPoint: string = 'http://localhost:8080/api/cuarteles';


  constructor(private http: HttpClient, private router:Router) { }

  getCuarteles(): Observable<Cuartel[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => { 
        let cuarteles = response as Cuartel[];
        return cuarteles.map(cuartel => {
          cuartel.nombre = cuartel.nombre.toUpperCase();
          cuartel.tipoUva = cuartel.tipoUva.toUpperCase();
          cuartel.nombreEncargadoBPA = cuartel.nombreEncargadoBPA.toUpperCase();
          cuartel.nombrePredio = cuartel.nombrePredio.toUpperCase();
          return cuartel;
        })
      })
    );
  }

  crearCuartel(cuartel: Cuartel): Observable<Cuartel> {
    return this.http.post<Cuartel>(this.urlEndPoint, cuartel).pipe(
      catchError(e => {
          this.router.navigate["/cuarteles"];
          console.error(e.error.mensaje);
          swal.fire('Error al crear', e.error.mensaje,'error');
          return throwError(e);
        })
       );
  }

  getCuartel(id: any): Observable<Cuartel> {
    return this.http.get<Cuartel>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/cuarteles"];
           console.error(e.error.mensaje);
           swal.fire('Error al buscar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
  }

  updateCuartel(cuartel:Cuartel): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cuartel.idCuartel}`, cuartel).pipe(
         catchError(e => {
           this.router.navigate["/cuarteles"];
           console.error(e.error.mensaje);
           swal.fire('Error al actualizar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
  }

  deleteCuartel(id: any): Observable<Cuartel>{
    return this.http.delete<Cuartel>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/cuarteles"];
           console.error(e.error.mensaje);
           swal.fire('Error al eliminar', e.error.mensaje,'error');
           return throwError(e);
         })
      );;
    }
}
