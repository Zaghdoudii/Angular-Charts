import { ChartServiceService } from './../../chart-service.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.css']
})


export class Chart1Component implements OnInit {


  constructor(private service: ChartServiceService) { }

  chartdata: any;
  nameAccData: any[] = [];
  costData: any[] = [];
  projectdata: any[] = [];
  perioddata: any[] = [];
  accountName: any[] = [];
  period: any[] = [];
  sum: any = 0;
  mostCostProject: any = 0;
  ngOnInit(): void {
    this.service.Getchartinfo().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          this.nameAccData.push(this.chartdata[i].account_name);
          this.costData.push(this.chartdata[i].cost);
          this.projectdata.push(this.chartdata[i].projet_id);
          this.perioddata.push(this.chartdata[i].period_end);
        }


        let accountName = Array.from(new Set(this.nameAccData));
        let totalCost = accountName.map(type => this.costData.reduce((acc, curr, index) => this.nameAccData[index] === type ? acc + curr : acc, 0));

        let idProject = Array.from(new Set(this.projectdata));
        let totalCostProject = idProject.map(type => this.costData.reduce((acc, curr, index) => this.projectdata[index] === type ? acc + curr : acc, 0));


        let period = Array.from(new Set(this.perioddata));
        let totalCostPeriod = period.map(type => this.costData.reduce((acc, curr, index) => this.perioddata[index] === type ? acc + curr : acc, 0));

        this.mostCostProject = Math.max(...totalCostProject);
        let sum1 = 0;
        for (let i = 0; i < this.costData.length; i++) {
          sum1 += this.costData[i];
        }

        this.sum = sum1;

        this.RenderChart(accountName, totalCost, 'piechart', 'pie');
        this.RenderChart(accountName, totalCost, 'barchart', 'bar');
        this.RenderChart(idProject, totalCostProject, 'piechart1', 'pie');
        this.RenderChart(period.sort(), totalCostPeriod, 'linechart', 'line');
        // this.RenderChart(this.nameAccData, this.costData, 'polarareachart', 'polarArea');
        // this.RenderChart(this.nameAccData, this.costData, 'scatterchart', 'scatter');
        // this.RenderChart(this.nameAccData, this.costData, 'Bubblechart', 'bubble');
      }



    });
  }


  RenderChart(nameAccData: any, maindata: any, id: any, type: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: nameAccData,
        datasets: [{
          label: 'Total cost ',
          data: maindata,
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
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
