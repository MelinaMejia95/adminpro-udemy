import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public _subirService: SubirArchivoService ) {
    this.cargarStorage();
   }

  logueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else{
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = id;

  }

  logout() {

    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

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
      }));

  }

  crearUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
     .pipe(map( (data: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return data.usuario;
      }));

  }

  actualizarUsuario( usuario: Usuario ) {
    
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .pipe(map((data: any) => {
        let usuarioDB: Usuario = data.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }));

  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirService.subirArchivo( archivo, 'usuarios', id )
      .then( (data: any) => {
        console.log(data)
        this.usuario.img = data.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch( data => {
        console.log(data);
      })

  }

  cargarUsuarios(desde: number = 0) {
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url); 

  }

}