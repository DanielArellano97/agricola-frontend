import { Injectable } from '@angular/core';
import { RegistroFitosanitario } from './registro-fitosanitario';
import { Observable, throwError  } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RegistroFitosanitarioService {

  urlEndPoint: string = 'http://localhost:8080/api/registrosFitosanitarios';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  private isNoAutorizado(e):boolean{
      if(e.status==401 || e.status==403){
        this.router.navigate(['/login'])
        return true;
      }
      return false;
    }

  getRegistrosFito(): Observable<RegistroFitosanitario[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let regiFitos = response as RegistroFitosanitario[];
        return regiFitos.map(regiFito => {
          regiFito.tipoMaquinaria = regiFito.tipoMaquinaria.toUpperCase();
          regiFito.estadoFenologico = regiFito.estadoFenologico.toUpperCase();
          regiFito.condicionesMetereologicas = regiFito.condicionesMetereologicas.toUpperCase();
          regiFito.nombreEncargadoBPA = regiFito.nombreEncargadoBPA.toUpperCase();
          regiFito.nombreFitosanitario = regiFito.nombreFitosanitario.toUpperCase();
          regiFito.nombreCuartel = regiFito.nombreCuartel.toUpperCase();
          return regiFito;
        });
      })
    );
  }

  crearRegistroFito(regisFito: RegistroFitosanitario): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, regisFito, { headers: this.httpHeaders }).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al agregar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );

  }

  getRegistroFito(id: any): Observable<RegistroFitosanitario> {
    return this.http.get<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          this.router.navigate(['/registrosFitosanitarios']);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );
  }

  updateRegistroFito(regisFito: RegistroFitosanitario): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${regisFito.idRegistroFitosanitario}`, regisFito, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       )
  }

  deleteRegistroFito(id: any): Observable<RegistroFitosanitario>{
    return this.http.delete<RegistroFitosanitario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          this.isNoAutorizado(e);
          swal.fire('Error al eliminar el registro fitosanitario', e.error.mensaje, 'error')
          return throwError(e);
        })
       );
  }
}
