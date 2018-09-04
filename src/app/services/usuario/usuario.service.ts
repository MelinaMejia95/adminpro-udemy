import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
//import  'rxjs/operator/map';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( public http: HttpClient) { }

  crearUsuario( usuario: Usuario ) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
     .pipe(map( (data: any) => {
        console.log('Creado');
        swal('Usuario Creado', usuario.email, 'success');
        return data.usuario;
      })
    )
  }

}
