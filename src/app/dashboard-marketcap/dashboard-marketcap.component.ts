import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatisticService } from '../statistic.service';




@Component({
  selector: 'app-dashboard-marketcap',
  templateUrl: './dashboard-marketcap.component.html',
  styleUrls: ['./dashboard-marketcap.component.css']
})
export class DashboardMarketcapComponent implements OnInit, AfterViewInit {
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
    this.statisticService.getMarketStatistic(startDate, endDate, 'btc').pipe(
      catchError(() => of({
        'prices': [[startDate.getTime(), 1]],
        'market_caps': [[startDate.getTime(), 1]],
        'total_volumes': [[startDate.getTime(), 1]]
      }))
    ).subscribe(
      marketStatistic => {
        // let prices = {
        //   name: 'Price',
        //   series: marketStatistic.prices.map(price => ({
        //     name: timeStampToDateLabel(price[0]),
        //     value: price[1]
        //   }))
        // };
        let market_caps = {
          name: 'Market Cap (BTC)',
          series: marketStatistic.market_caps.map(market_cap => {
            return {
              name: new Date(market_cap[0]),
              value: market_cap[1]
            };
          })
        };
        let total_volumes = {
          name: 'Volume (BTC)',
          series: marketStatistic.total_volumes.map(total_volume => {
            return {
              name: new Date(total_volume[0]),
              value: total_volume[1]
            };
          })
        };

        this.chartData = [
          // prices,
          market_caps,
          total_volumes
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
    domain: ['#b14198', '#69F0AE', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let parentHeight: number = this.elRef.nativeElement.parentElement.clientHeight;
    let parentWidth: number = this.elRef.nativeElement.parentElement.clientWidth;
    this.view = [parentWidth, parentHeight];
    this.cd.detectChanges();
  }

  onSelect(data: any): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    // let parentHeight: number = this.elRef.nativeElement.parentElement.clientHeight;
    // let parentWidth: number = this.elRef.nativeElement.parentElement.clientWidth;
    // console.log('h ' + parentHeight + ' w ' + parentWidth);
  }

  onActivate(data: any): void {
  }

  onDeactivate(data: any): void {
  }
}
