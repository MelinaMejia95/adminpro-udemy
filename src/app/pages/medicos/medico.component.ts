import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor( public _medicoService: MedicoService, public _hospitalSerice: HospitalService, public router: Router, public activatedRoute: ActivatedRoute, public _modalService: ModalUploadService  ) { 

    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if(id !== 'nuevo') {
        this.cargarMedico(id);
      }
    })

  }

  ngOnInit() {

    this._hospitalSerice.cargarHospitales().subscribe( hospitales => this.hospitales = hospitales );
    this._modalService.notificacion.subscribe( data => {
      this.medico.img = data.medico.img;
    });

  }

  cargarMedico(id: string) {

    this._medicoService.cargarMedico(id).subscribe( data => {
      this.medico = data
      this.medico.hospital = data.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });

  }

  guardarMedico(f: NgForm) {
    
    console.log(f.valid)
    console.log(f.value)
    if(f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe( data => {
      this.medico._id = data._id;
      this.router.navigate(['/medico', data._id]);
      console.log(data)
    });

  }

  cambioHospital(id: string) {

    this._hospitalSerice.obtenerHospital(id).subscribe( (hospital: any) => {
      console.log(hospital)
      this.hospital = hospital });

  }

  cambiarImagen() {

    this._modalService.mostrarModal('medicos', this.medico._id);

  }

}
