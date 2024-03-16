import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
  RenderChart(labelData: any, mainData: any, colorData: any, typeofChart: any, id: string) {
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
            grid: {
              color: 'rgba(0, 0, 0, 1)', // Set the grid lines to black
              borderDash: [5, 5] // Optional: Add dashed lines
          },
            beginAtZero: true,
            ticks: {
              color: 'black', // Set the label color to white
            }
          },
        },  
      }
    });

  }
}
