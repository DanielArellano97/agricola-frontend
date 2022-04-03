import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DuenoCampo } from './dueno';

@Injectable({
  providedIn: 'root'
})
export class DuenoService {

  urlEndPoint: string = 'http://localhost:8080/api/duenos';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  private isNoAutorizado(e): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  }

  getDuenos(): Observable<DuenoCampo[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response) => response as DuenoCampo[]),
      catchError((e) => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
