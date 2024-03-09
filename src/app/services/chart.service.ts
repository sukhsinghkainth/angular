import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
  RenderChart(labelData: any, mainData: any, colorData: any, typeofChart: any, id: any) {
    new Chart(id, {
      type: typeofChart,
      data: {
        labels: labelData,
        datasets: [{
          label: "",
          data: mainData,
          backgroundColor: colorData,
          borderColor: [`rgba(0,0,0,1)`],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
}
