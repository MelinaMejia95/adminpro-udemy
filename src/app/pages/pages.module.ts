import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { sharedModule } from "../shared/shared.module";
import { PAGES_ROUTES } from './pages.routes';

//Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        sharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule {}