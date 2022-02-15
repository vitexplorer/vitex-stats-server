import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-dash-board-transaction-trend',
  templateUrl: './dash-board-transaction-trend.component.html',
  styleUrls: ['./dash-board-transaction-trend.component.css']
})
export class DashBoardTransactionTrendComponent implements OnInit {

  chartData: any[] = [];
  view: [number, number] = [700, 350];

  constructor(private elRef: ElementRef,
    private cd: ChangeDetectorRef,
    private statisticService: StatisticService) {
  }



  ngOnInit(): void {
    this.chartData = [];

    const endDate = new Date();
    // start date is 10 days before endDate
    const startDate = new Date(endDate.getTime() - (1000 * 60 * 60 * 24 * 10));
    this.statisticService.getDailyStatistic(startDate, endDate).subscribe(data => {
      let transactions = data.result.map(item => {
        return {
          name: item.date,
          value: item.transactionCount
        }
      });
      this.chartData = [
        {
          'name': 'Transactions',
          'series': transactions
        }
      ];
    });

  }

  ngAfterViewInit(): void {
    this.onResize(null);
  }

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Transactions';
  showGridLines: boolean = false;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#69F0AE', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let parentHeight: number = this.elRef.nativeElement.parentElement.clientHeight;
    let parentWidth: number = this.elRef.nativeElement.parentElement.clientWidth;
    this.view = [parentWidth, parentHeight];
    this.cd.detectChanges();
  }

  onSelect(event: any) {
    console.log(event);
  }
}
