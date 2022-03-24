import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-dashboard-price-trend',
  templateUrl: './dashboard-price-trend.component.html',
  styleUrls: ['./dashboard-price-trend.component.css']
})
export class DashboardPriceTrendComponent implements OnInit {
  chartData: any[] = [];
  view: [number, number] = [700, 350];


  constructor(private elRef: ElementRef,
    private cd: ChangeDetectorRef,
    private statisticService: StatisticService) {
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  ngAfterViewInit(): void {
    this.onResize(null);
  }

  loadChartData() {
    let endDate = new Date();
    // 2 week ago
    let startDate = new Date(endDate.getTime() - (1000 * 60 * 60 * 24 * 14));
    this.statisticService.getMarketStatistic(startDate, endDate, 'usd').pipe(
      catchError(() => of({
        'prices': [[startDate.getTime(), 1]],
        'market_caps': [[startDate.getTime(), 1]],
        'total_volumes': [[startDate.getTime(), 1]]
      }))
    ).subscribe(
      marketStatistic => {
        let prices = {
          name: 'Price',
          series: marketStatistic.prices.map(price => ({
            name: new Date(price[0]),
            value: price[1]
          }))
        };

        this.chartData = [
          prices,
        ];
      }
    )
  }

  // chart options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'MarketCap';
  timeline: boolean = true;
  showGridLines: boolean = false;

  colorScheme = {
    domain: ['#7cb342', '#E44D25', '#b14198', '#69F0AE', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let parentHeight: number = this.elRef.nativeElement.parentElement.clientHeight;
    let parentWidth: number = this.elRef.nativeElement.parentElement.clientWidth;
    this.view = [parentWidth, parentHeight];
    this.cd.detectChanges();
  }

  onSelect(data: any): void {
  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }
}
