import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( public _subirArchivo: SubirArchivoService, public _uploadService: ModalUploadService ) { 
    
  }

  ngOnInit() {
  } 

  cerrarModal() {

    this.imagenTemp = null;
    this.imagenSubir = null;
    this._uploadService.ocultarModal();

  }

  seleccionImagen(archivo: File){

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen() {
       
    this._subirArchivo.subirArchivo(this.imagenSubir, this._uploadService.tipo, this._uploadService.id)
      .then( data => {
        this._uploadService.notificacion.emit(data);
        this.cerrarModal();
      })
      .catch( err => {
        console.log('Error en la carga')
      })

  }

}
