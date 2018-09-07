import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService, public _uploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._uploadService.notificacion.subscribe( data => this.cargarHospitales() );
  }

  mostrarModal(id: string) {
    
    this._uploadService.mostrarModal('hospitales', id);

  }

  cargarHospitales() {

    console.log(this.desde)
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe( (data: any) => {
      this.totalRegistros = this._hospitalService.totalHospitales;
      this.hospitales = data;
      this.cargando = false;
    });

  }  

  cambiarDesde(valor: number) {
    
    let desde = this.desde + valor;
    console.log(desde);
    if(desde >= this.totalRegistros) {
      return;
    }
    if(desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();

  }

  buscarHospital(termino: string) {

    if(termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino).subscribe(( hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    });

  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: "¿Está seguro?",
      text: "Está a punto de borrar a " + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(() => {
          this.desde = this.desde - 5;
          this.cargarHospitales();
        })
      } 
    });

  }

  crearHospital() {
    swal({
      text: 'Ingresa el nombre del hospital',
      content: "input",
       buttons: ["Cancelar", 'Crear'],
        icon: 'info'
    })
    .then(name => {
      if(!name || name.length === 0) {
        return;
      }
      let hospital = new Hospital(name);
      this._hospitalService.crearHospital(hospital).subscribe(() => {
        this.cargarHospitales();
      });
    })
    .catch(err => {
      if (err) {
        swal("Oh noes!", "The AJAX request failed!", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
  }

}
