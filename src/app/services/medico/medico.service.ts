import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
    
  constructor( public http: HttpClient, public _usuarioService: UsuarioService ) { }

  cargarMedicos(desde: number = 0) {

    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get(url)
      .pipe(map( (data: any) => {
        this.totalMedicos = data.total;
        return data.medico;
      }));

  }

  buscarMedicos(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url)
      .pipe(map( (data: any) => data.medicos))
      
  }

  borrarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;    
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .pipe(map( data => {
        swal('Médico borrado', 'Médico elimiando correctamente', 'success');
        return data;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      }));

  }

  guardarMedico(medico: Medico) {
    
    let url = URL_SERVICIOS + '/medico/';

    if (medico._id) {
      //Actualizar
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico)
        .pipe(map( (data: any) => {
          swal('Médico actualizado', medico.nombre, 'success')
          return data.medico;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw(err);
        }));
    } else {
      //Crear
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico)
        .pipe(map( (data: any) => {
          swal('Médico creado', medico.nombre, 'success')
          return data.medico;
        }),
        catchError( err => {
          swal(err.error.mensaje, err.error.errors.message, 'error');
          return Observable.throw(err);
        }));
    }

  }

  cargarMedico(id: string) {

    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
      .pipe(map( (data: any) => data.medico ));

  }

}
