import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/app/models/summary';
import { SummaryService } from 'src/app/services/summary.service';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  summary: Summary;
  users30: number;
  orders30: number;
  sales30: number;
  totalProducts: number;
  usersTotal: number;
  ordersTotal: number;

  colors = {
    a: '#EA7773',
    b: '#1BCA9B',
    c: '#1287A5',
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };

  constructor(private summaryService: SummaryService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.summaryService.getSummary().subscribe({
      next: (summary) => {
        //console.log(summary);
        this.summary = summary;

        this.orders30 = summary.result.last30DaysSummary.orders;
        this.users30 = summary.result.last30DaysSummary.userRegistered;
        this.sales30 = summary.result.last30DaysSummary.sale;
        this.ordersTotal = summary.result.overAll.orders;
        this.usersTotal = summary.result.overAll.users;
        this.totalProducts = summary.result.overAll.products;
      },
    });
  }
}
