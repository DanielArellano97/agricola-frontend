import { Injectable } from '@angular/core';
import { EncargadoBPA } from './encargado-bpa';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EncargadoBPAService {

  urlEndPoint: string = 'http://localhost:8080/api/encargadosBPA';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }

  getEncargados(): Observable<EncargadoBPA[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let encargados = response as EncargadoBPA[];
        return encargados.map(encargado => {
          encargado.nombre = encargado.nombre.toUpperCase();
          return encargado;
        })
      })
    );
  }

  crearEncargado(encargado: EncargadoBPA): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, encargado, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al agregar', e.error.mensaje, 'error');
          return throwError(e);
          
        })
       );

  }

  getEncargado(run: any): Observable<EncargadoBPA> {
    return this.http.get<EncargadoBPA>(`${this.urlEndPoint}/${run}`).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          this.router.navigate(['/encargadosBPA']);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );
  }

  updateEncargado(encargado: EncargadoBPA): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${encargado.run}`, encargado, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       )
  }

  deleteEncargado(run: any): Observable<EncargadoBPA>{
    return this.http.delete<EncargadoBPA>(`${this.urlEndPoint}/${run}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al eliminar el campo', e.error.mensaje, 'error')
          return throwError(e);
        })
       );
  }

}
