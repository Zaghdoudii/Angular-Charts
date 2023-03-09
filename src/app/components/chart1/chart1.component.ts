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
  projectdata: any[] = [];
  perioddata: any[] = [];
  accountName: any[] = [];
  period: any[] = [];
  sum: any = 0;

  ngOnInit(): void {
    this.service.Getchartinfo().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          //  console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].account_name);
          this.realdata.push(this.chartdata[i].cost);
          this.projectdata.push(this.chartdata[i].projet_id);
          this.perioddata.push(this.chartdata[i].period_end);
        }


        let accountName = Array.from(new Set(this.labeldata));
        let totalCost = accountName.map(type => this.realdata.reduce((acc, curr, index) => this.labeldata[index] === type ? acc + curr : acc, 0));

        let idProject = Array.from(new Set(this.projectdata));
        let totalCostProject = idProject.map(type => this.realdata.reduce((acc, curr, index) => this.projectdata[index] === type ? acc + curr : acc, 0));


        let period = Array.from(new Set(this.perioddata));
        // console.log("Period: ", period);
        let totalCostPeriod = period.map(type => this.realdata.reduce((acc, curr, index) => this.perioddata[index] === type ? acc + curr : acc, 0));


        let sum1 = 0;
        for (let i = 0; i < this.realdata.length; i++) {
          sum1 += this.realdata[i];
        }

        this.sum = sum1;
        console.log("Total spend : ", this.sum);

        this.RenderChart(accountName, totalCost, 'piechart', 'pie');
        this.RenderChart(accountName, totalCost, 'barchart', 'bar');
        this.RenderChart(idProject, totalCostProject, 'piechart1', 'pie');
        this.RenderChart(period.sort(), totalCostPeriod, 'linechart', 'line');
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
      // options: {
      //   scales: {
      //     y: {
      //       beginAtZero: true
      //     }
      //   }
      // }
    });
  }

}
