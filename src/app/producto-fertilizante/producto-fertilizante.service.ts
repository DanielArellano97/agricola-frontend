import { Injectable } from '@angular/core';
import { ProductoFertilizante } from './producto-fertilizante';
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError,tap } from 'rxjs/operators';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ProductoFertilizanteService {

   urlEndPoint: string = 'http://localhost:8080/api/fertilizantes';


   constructor(private http: HttpClient,private router:Router) { }


   getFertilizantes(): Observable<ProductoFertilizante[]> {
     return this.http.get(this.urlEndPoint).pipe(
       map(response => {
         let fertilizantes = response as ProductoFertilizante[];     
         return fertilizantes.map(ferti => {
           ferti.nombreComercial = ferti.nombreComercial.toUpperCase();
           ferti.tipo = ferti.tipo.toUpperCase();
           ferti.variedad = ferti.variedad.toUpperCase();
           return ferti;
         }) 
      })
     );
   }

   crearFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.post<ProductoFertilizante>(this.urlEndPoint, fertilizante).pipe(
         catchError(e => {
           this.router.navigate["/fertilizantes"];
           console.error(e.error.mensaje);
           swal.fire('Error al crear', e.error.mensaje,'error');
           return throwError(e);
         })
      );
   }

   getFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.get<ProductoFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/fertilizantes"];
           console.error(e.error.mensaje);
           swal.fire('Error al buscar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
   }

   updateFertilizante(fertilizante: ProductoFertilizante): Observable<ProductoFertilizante> {
     return this.http.put<ProductoFertilizante>(`${this.urlEndPoint}/${fertilizante.idFertilizante}`, fertilizante).pipe(
         catchError(e => {
           this.router.navigate["/fertilizantes"];
           console.error(e.error.mensaje);
           swal.fire('Error al editar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
   }

   deleteFertilizante(id: any): Observable<ProductoFertilizante> {
     return this.http.delete<ProductoFertilizante>(`${this.urlEndPoint}/${id}`).pipe(
         catchError(e => {
           this.router.navigate["/administradores"];
           console.error(e.error.mensaje);
           swal.fire('Error al eliminar', e.error.mensaje,'error');
           return throwError(e);
         })
      );
   }
}
