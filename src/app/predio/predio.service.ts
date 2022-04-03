import { Injectable } from '@angular/core';
import { Predio } from './predio';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PredioService {

  urlEndPoint: string = 'http://localhost:8080/api/predios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient,private router:Router ) { }

  private isNoAutorizado(e):boolean{
       if(e.status==401 || e.status==403){
         this.router.navigate(['/login'])
         return true;
       }
       return false;
  }

  getPredios(): Observable<Predio[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let predios = response as Predio[];
        return predios.map(predio => {
          predio.nombre = predio.nombre.toUpperCase();
          predio.nombreCampo = predio.nombreCampo.toUpperCase();
          return predio;
        })     
      })
    );
  }

  crearPredio(predio: Predio): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, predio, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al agregar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );

  }

  getPredio(id: any): Observable<Predio> {
    return this.http.get<Predio>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          this.router.navigate(['/predios']);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );
  }

  updatePredio(predio: Predio): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${predio.idPredio}`, predio, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       )
  }

  deletePredio(id: any): Observable<Predio>{
    return this.http.delete<Predio>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al eliminar el predio', e.error.mensaje, 'error')
          return throwError(e);
        })
       );
  }
}
