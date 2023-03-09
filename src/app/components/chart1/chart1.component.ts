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
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];


  ngOnInit(): void {
    this.service.Getchartinfo().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          //  console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].account_name);
          this.realdata.push(this.chartdata[i].cost);
        }


        let accountName = Array.from(new Set(this.labeldata));
        let totalCost = accountName.map(type => this.realdata.reduce((acc, curr, index) => this.labeldata[index] === type ? acc + curr : acc, 0));


        this.RenderChart(accountName, totalCost, 'piechart', 'pie');
        this.RenderChart(accountName, totalCost, 'barchart', 'bar');
        // this.RenderChart(this.labeldata, this.realdata, 'doughnutchart', 'doughnut');
        this.LineChart(accountName, totalCost, 'linechart', 'line');
        // this.RenderChart(this.labeldata, this.realdata, 'polarareachart', 'polarArea');
        // this.RenderChart(this.labeldata, this.realdata, 'scatterchart', 'scatter');
        // this.RenderChart(this.labeldata, this.realdata, 'Bubblechart', 'bubble');
      }


    });
  }



  RenderChart(labeldata: any, maindata: any, id: any, type: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Total cost :',
          data: maindata,
          backgroundColor: [
            "blue", "red", "green", "yellow"
          ],
          borderColor: "blue",
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



  LineChart(labeldata: any, maindata: any, id: any, type: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Total cost :',
          data: maindata,
          backgroundColor: [
            "blue", "red", "green", "yellow"
          ],
          borderColor: "blue",
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
