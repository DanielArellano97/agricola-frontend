import { Injectable } from '@angular/core';
import { Administrador } from './Administrador';
import { Observable, throwError} from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

    urlEndPoint: string = 'http://localhost:8080/api/administradores';

    constructor(private http: HttpClient, private router:Router) { }



    getAdministradores(): Observable<Administrador[]> {
      return this.http.get(this.urlEndPoint).pipe(
        map(response => {
          let admnis = response as Administrador[];
          return admnis.map(admin => {
            admin.nombre = admin.nombre.toUpperCase();
            return admin;
          })
        })
      );
    }


    crearAdministrador(administrador: Administrador): Observable<any> {
      return this.http.post<any>(this.urlEndPoint, administrador).pipe(
         catchError(e => {
           this.router.navigate["/administradores"];
           console.error(e.error.mensaje);
           swal.fire('Error al crear', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }

    getAdministrador(run: any): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.urlEndPoint}/${run}`).pipe(
         catchError(e => {
           this.router.navigate["/administradores"];
           console.error(e.error.mensaje);
           swal.fire('Error al editar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }

    updateAdministrador(administrador: Administrador): Observable<Administrador>{
      return this.http.put<Administrador>(`${this.urlEndPoint}/${administrador.run}`, administrador).pipe(
         catchError(e => {
           this.router.navigate["/administradores"];
           console.error(e.error.mensaje);
           swal.fire('Error al editar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }

    deleteAdministrador(run: any): Observable<Administrador>{
      return this.http.delete<Administrador>(`${this.urlEndPoint}/${run}`).pipe(
         catchError(e => {
           this.router.navigate["/administradores"];
           console.error(e.error.mensaje);
           swal.fire('Error al eliminar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
    }
}
