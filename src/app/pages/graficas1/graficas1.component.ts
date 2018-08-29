import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

 /*  colors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]*/

  graficos: any = {
    'grafico1': {
      'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'leyenda': 'El pan se come con',
    },
    'grafico2': {
      'labels': ['Hombres', 'Mujeres'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Entrevistados'
    },
    'grafico3': {
      'labels': ['Si', 'No'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': '¿Le dan gases los frijoles?'
    },
    'grafico4': {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
