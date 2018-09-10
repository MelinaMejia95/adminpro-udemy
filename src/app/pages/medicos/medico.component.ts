import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();

  constructor( public _medicoService: MedicoService, public _hospitalSerice: HospitalService ) { }

  ngOnInit() {

    this._hospitalSerice.cargarHospitales().subscribe( hospitales => this.hospitales = hospitales );

  }

  guardarMedico(f: NgForm) {
    
    console.log(f.valid)
    console.log(f.value)
    if(f.invalid) {
      return;
    }
    this._medicoService.guardarMedico(this.medico).subscribe( data => {
      console.log(data)
    });

  }

}
