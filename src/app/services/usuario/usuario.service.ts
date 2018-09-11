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
  menu: any = [];

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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = id;
    this.menu = menu;

  }

  logout() {

    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token } )
      .pipe(map( (data: any) => {
        console.log(data)
        this.guardarStorage(data.id, data.token, data.usuario, data.menu);
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
        console.log(data)
        this.guardarStorage(data.id, data.token, data.usuario, data.menu);
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

        if(usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = data.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
        }
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
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch( data => {
        console.log(data);
      })

  }

  cargarUsuarios(desde: number = 0) {
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url); 

  }

  buscarUsuarios(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .pipe(map( (data: any) => data.usuarios))
      
  }

  borrarUsuario(id: string) {
    
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map( data => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      }));

  }

}
