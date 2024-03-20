import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private chartInstances: { [id: string]: Chart } = {};

  constructor() { }
  RenderChart(labelData: any, mainData: any, colorData: any, typeofChart: any, canvasId: string) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    if (ctx) {
      this.destroyChart(canvasId)
    }
    this.chartInstances[canvasId] = new Chart(ctx, {
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
              color: 'rgba(0, 0, 0, 1)',
              borderDash: [5, 5]
            },
            beginAtZero: true,
            ticks: {
              color: 'black',
            }
          },
        },
      }
    });
  }
  destroyChart(canvasId: string): void {
    const chartInstance = this.chartInstances[canvasId];
    console.log(chartInstance)
    if (chartInstance) {
      chartInstance.destroy();
      delete this.chartInstances[canvasId];
    }
  }
}
