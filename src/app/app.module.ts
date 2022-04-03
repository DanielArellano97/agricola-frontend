import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { EncargadosBPAComponent } from './encargados-bpa/encargados-bpa.component';
import { EncargadoBPAService} from './encargados-bpa/encargado-bpa.service';
import { ProductoFitosanitarioService} from './producto-fitosanitario/producto-fitosanitario.service';
import { CamposService} from './campos/campos.service';
import { PredioService} from './predio/predio.service';
import { RegistroFitosanitarioService} from './registro-fitosanitario/registro-fitosanitario.service';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductoFitosanitarioComponent } from './producto-fitosanitario/producto-fitosanitario.component';
import { SidenavDefinitivoComponent } from './sidenav-definitivo/sidenav-definitivo.component';
import { CamposComponent } from './campos/campos.component';
import { RegistroFitosanitarioComponent } from './registro-fitosanitario/registro-fitosanitario.component';
import { PredioComponent } from './predio/predio.component';
import { CuartelComponent } from './cuartel/cuartel.component';
import { CuartelService} from './cuartel/cuartel.service';
import { ProductoFertilizanteComponent } from './producto-fertilizante/producto-fertilizante.component';
import { ProductoFertilizanteService} from './producto-fertilizante/producto-fertilizante.service';
import { RegistroFertilizanteService} from './registro-fertilizante/registro-fertilizante.service';
import { RegistroFertilizanteComponent} from './registro-fertilizante/registro-fertilizante.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorService } from './administrador/administrador.service';
import { LoginComponent } from './usuarios/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {AuthGuard} from './usuarios/guards/auth.guard';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { DuenoCampoComponent } from './dueno-campo/dueno-campo.component';
import { DuenoService } from './dueno-campo/dueno.service';
// import { NgxMaskModule, IConfig } from 'ngx-mask';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterTipofertiPipe } from './pipes/filter-tipoferti.pipe';
import { FilterTipofitoPipe } from './pipes/filter-tipofito.pipe';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: 'encargadosBPA', component: EncargadosBPAComponent, canActivate:[AuthGuard]},
  {path: 'fitosanitarios', component: ProductoFitosanitarioComponent, canActivate:[AuthGuard]},
  {path: 'campos', component: CamposComponent, canActivate:[AuthGuard]},
  {path: 'registrosFitosanitarios', component: RegistroFitosanitarioComponent, canActivate:[AuthGuard]},
  {path: 'predios', component: PredioComponent, canActivate:[AuthGuard]},
  {path: 'cuarteles', component: CuartelComponent, canActivate:[AuthGuard]},
  {path: 'fertilizantes', component: ProductoFertilizanteComponent, canActivate:[AuthGuard]},
  {path: 'registrosFertilizantes', component: RegistroFertilizanteComponent, canActivate:[AuthGuard]},
  {path: 'administradores', component: AdministradorComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'estadisticas', component: EstadisticasComponent,canActivate:[AuthGuard]},
];

// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    EncargadosBPAComponent,
    HomeComponent,
    ProductoFitosanitarioComponent,
    SidenavDefinitivoComponent,
    CamposComponent,
    RegistroFitosanitarioComponent,
    PredioComponent,
    CuartelComponent,
    ProductoFertilizanteComponent,
    RegistroFertilizanteComponent,
    AdministradorComponent,
    LoginComponent,
    NavbarComponent,
    EstadisticasComponent,
    DuenoCampoComponent,
    FilterPipe,
    FilterTipofertiPipe,
    FilterTipofitoPipe

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    NgxPaginationModule
    // NgxMaskModule.forRoot(),
  ],
  providers: [
    EncargadoBPAService,
    ProductoFitosanitarioService,
    CamposService,
    PredioService,
    RegistroFitosanitarioService,
    CuartelService,
    ProductoFertilizanteService,
    RegistroFertilizanteService,
    AdministradorService,
    DuenoService,
    { provide: HTTP_INTERCEPTORS, useClass:TokenInterceptor , multi: true },
      { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
