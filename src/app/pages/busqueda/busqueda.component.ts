import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public activatedRoute: ActivatedRoute, public http: HttpClient ) {

    activatedRoute.params.subscribe( params => {
      let termino = params['termino'];
      this.buscar(termino);
      console.log(termino);
    });

   }

  ngOnInit() {
  }

  buscar(termino: string) {
    
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe( (data: any) => {
      this.hospitales = data.hospitales;
      this.medicos = data.medicos;
      this.usuarios = data.usuarios;
      console.log(data);
    });

  }
  
}
