import { Injectable } from '@angular/core';
import { Campos } from './campos';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map,catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CamposService {

  urlEndPoint: string = 'http://localhost:8080/api/campos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  getCampos(): Observable<Campos[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => {
        let campos = response as Campos[];
        return campos.map(campo => {
          campo.nombre = campo.nombre.toUpperCase();
          campo.direccion = campo.direccion.toUpperCase();
          campo.nombreDuenoCampo = campo.nombreDuenoCampo.toUpperCase();
          campo.nombreAdministrador = campo.nombreAdministrador.toUpperCase();
          return campo;
        })
      }),
    );
  }

  crearCampo(campo: Campos): Observable<any> {
    return this.http.post<any>(this.urlEndPoint, campo).pipe(
        catchError(e =>{
          this.router.navigate["/campos"];
          console.error(e.error.mensaje);
          swal.fire("Error al crear el campo", e.error.mensaje, 'error')
          return throwError(e);
        })
    );
  }

  getCampo(id: any): Observable<Campos> {
    return this.http.get<Campos>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          console.error(e.error.mensaje);
          this.router.navigate(['/campos']);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       );
  }

  updateCampo(campo: Campos): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${campo.idCampo}`, campo).pipe(
        catchError(e =>{         
          console.log(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
       )
  }

  deleteCampo(id: any): Observable<Campos>{
    return this.http.delete<Campos>(`${this.urlEndPoint}/${id}`).pipe(
        catchError(e =>{
          console.log(e.error.mensaje);
          swal.fire('Error al eliminar el campo', e.error.mensaje, 'error')
          return throwError(e);
        })
       );
  }
}
