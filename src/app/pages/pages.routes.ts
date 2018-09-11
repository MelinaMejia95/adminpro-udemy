import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, VerificatokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/service.index';



const pagesRoutes: Routes = [
    /* { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [ */
            { 
                path: 'dashboard', 
                component: DashboardComponent, 
                data: { titulo: 'Dashboard' },
                canActivate: [VerificatokenGuard]
             },
            { path: 'progress', component: ProgressComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, canActivate: [VerificatokenGuard], data: { titulo: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, canActivate: [VerificatokenGuard], data: { titulo: 'RxJs' } },
            { path: 'account-settings', component: AccountSettingsComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Ajustes del tema' } },
            { path: 'perfil', component: ProfileComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Perfil de Usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Buscador' } },
            //Mantenimientos 
            { 
                path: 'usuarios', 
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Usuarios' } 
            },
            { path: 'hospitales', component: HospitalesComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Mantenimiento de Hospitales' } },
            { path: 'medicos', component: MedicosComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Mantenimiento de Médicos' } },
            { path: 'medico/:id', component: MedicoComponent, canActivate: [VerificatokenGuard], data: { titulo: 'Actualizar Médico' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
       /*  ]
     } */
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );