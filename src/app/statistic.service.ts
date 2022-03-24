import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinResponse, DailyStatisticResponse, MarketStatResponse } from './statistic';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  getDailyStatistic(startDate: Date, endDate: Date): Observable<DailyStatisticResponse> {
    const startDateStr = startDate.toISOString().substring(0, 10);
    const endDateStr = endDate.toISOString().substring(0, 10);

    const reqUrl: string = environment.backendURL() + '/statistic/get_daily_statistics/' +
      startDateStr + '/' + endDateStr;
    return this.http.get<DailyStatisticResponse>(reqUrl);
  };


  getMarketStatistic(startDate: Date, endDate: Date, currency: string = 'btc'): Observable<MarketStatResponse> {
    const startDateTimestamp = startDate.getTime() / 1000;
    const endDateTimestamp = endDate.getTime() / 1000;

    const reqUrl = environment.coinGeckoURL + '/coins/vite/market_chart/range?vs_currency=' + currency + '&from=' + startDateTimestamp + '&to=' + endDateTimestamp;

    return this.http.get<MarketStatResponse>(reqUrl);

  }

  getCoinSupply(): Observable<CoinResponse> {
    const reqUrl = environment.coinGeckoURL + '/coins/vite?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
    return this.http.get<CoinResponse>(reqUrl);
  }
}
