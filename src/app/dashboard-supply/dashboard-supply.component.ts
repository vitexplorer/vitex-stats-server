import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StatisticService } from '../statistic.service';

@Component({
  selector: 'app-dashboard-supply',
  templateUrl: './dashboard-supply.component.html',
  styleUrls: ['./dashboard-supply.component.css']
})
export class DashboardSupplyComponent implements OnInit {


  single: any[] = [];
  view: [number, number] = [700, 350];
  legend: boolean = false;
  legendPosition: string = 'right';
  gaugeMax: number = 100;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };


  constructor(private statisticService: StatisticService,
    private elRef: ElementRef,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.statisticService.getCoinSupply().pipe(
      catchError(() => of({
        'market_data': {
          'total_supply': 0,
          'circulating_supply': 0,
          'last_updated': new Date()
        }
      })
      )
    ).subscribe(
      coinStat => {
        let circulating_supply = Math.ceil(coinStat.market_data.circulating_supply);
        this.single = [
          {
            "name": "Circulating Supply",
            "value": circulating_supply
          }
        ];
        this.gaugeMax = Math.pow(10, Math.ceil(Math.log10(circulating_supply)));
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let parentHeight: number = this.elRef.nativeElement.parentElement.clientHeight;
    let parentWidth: number = this.elRef.nativeElement.parentElement.clientWidth;
    this.view = [parentWidth, parentHeight];
    this.cd.detectChanges();
  }


  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
