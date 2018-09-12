import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  hospital: Hospital;
  totalHospitales: number = 0;

  constructor( public http: HttpClient, public _subirService: SubirArchivoService ) {
    this.cargarStorage();
   }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else{
      this.token = '';
    }

  }
  

  cargarHospitales(desde: number = 0) {

    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get(url)
    .pipe(map( (data: any) => {
      this.totalHospitales = data.total;
      return data.hospitales;
    }))

  }

  obtenerHospital(id: string) {
    
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url)
      .pipe(map( (data: any) => data.hospital ))

  }

  borrarHospital(id:string) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .pipe(map( data => {
          swal('Hospital borrado', 'El hospital se ha eliminado correctamente', 'success');
          return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      }));

  }

  crearHospital(hospital: Hospital) {
    console.log(hospital)
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, hospital)
      .pipe(map( data => {
        swal('Hospital creado', 'El hospital se ha creado correctamente', 'success');
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      }));

  }

  buscarHospital(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get(url)
      .pipe(map( (data: any) => data.hospitales))

  }

  actualizarHospital(hospital: Hospital) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital)
      .pipe(map((data: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      }),
      catchError( err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw(err);
      }));

  }

}
