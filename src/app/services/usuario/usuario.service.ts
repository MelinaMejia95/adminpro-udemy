import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient) { }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = id;

  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
      .pipe(map( (data: any) => {
        this.guardarStorage(data.id, data.token, data.usuario);
        return true;
      }));

  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    }  else {
      localStorage.removeItem('email');
    }
    
    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
      .pipe(map( (data: any) => {
        this.guardarStorage(data.id, data.token, data.usuario);
        return true;
      }))

  }

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
