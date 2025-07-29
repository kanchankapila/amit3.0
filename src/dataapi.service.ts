import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataapiService {
  /**
   * Base URL for API calls.  It is determined based on the current
   * hostname in the constructor.  This avoids hard‑coding a server
   * address and makes the service usable in both local development
   * and production deployments.
   */
  baseurl: string;

  constructor(private http: HttpClient) {
    this.setBaseUrl();
  }

  /**
   * Sets the base URL for all API calls.  When running on
   * localhost, requests are proxied to a local development server.
   * Otherwise, calls are directed at the production Netlify site.
   */
  private setBaseUrl(): void {
    if (window.location.hostname === 'localhost') {
      this.baseurl = 'http://localhost:9999';
    } else {
      this.baseurl = 'https://stockinsights.netlify.app';
    }
  }

  /**
   * Central error handler.  Logs the error to the console and
   * returns an observable that emits a user‑friendly error.  All
   * HTTP calls in this service pipe through this handler.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('DataapiService error:', error);
    return throwError(() => new Error('Unable to fetch data; please try again later.'));
  }

  // -------------------------------------------------------------------------
  // API methods
  // Each method returns an Observable so that consumers can subscribe
  // asynchronously.  Query parameters are passed via the `params`
  // option to ensure proper URL encoding and avoid manual string
  // interpolation.

  /** Example external call. */
  getTest1(): Observable<any> {
    return this.http
      .get<any>('https://kayal.trendlyne.com/clientapi/kayal/content/checklist-bypk/2633/')
      .pipe(catchError(this.handleError));
  }

  // Screeners Component
  getNteodScreeners(ntoptions: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseurl}/.netlify/functions/ntscreeners`, ntoptions)
      .pipe(catchError(this.handleError));
  }

  getTrendlynePostDvm(): Observable<any> {
    return this.http
      .get<any>('https://render-express-e54x.onrender.com/api/trendlyneDVM')
      .pipe(catchError(this.handleError));
  }

  setOpstraCookie(): Observable<any> {
    return this.http
      .get<any>('https://render-express-e54x.onrender.com/api/Opstracookie')
      .pipe(catchError(this.handleError));
  }

  // Navbar Components
  getTtmmi(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/tickertapeapi`)
      .pipe(catchError(this.handleError));
  }

  getNtVolume(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntvolume`)
      .pipe(catchError(this.handleError));
  }

  // Bank Nifty, Pharma Nifty, Share Component
  getTlIndexParams(tlid: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/trendlyneindex`, { params: { tlid } })
      .pipe(catchError(this.handleError));
  }

  // Homepage Component
  getTlrefresh(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/tlrefresh`)
      .pipe(catchError(this.handleError));
  }

  // Nifty Component
  getInvestingIndicators(indexid: string, duration: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/investingindicators`, {
        params: { indexid, duration }
      })
      .pipe(catchError(this.handleError));
  }

  // Nifty Component, Navbar Component
  getNtNiftyPcrDetails(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntniftypcr`)
      .pipe(catchError(this.handleError));
  }

  getKite1(timeframe: string, eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/kite1`, { params: { timeframe, eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  // Share Component
  getKotakScore(stock: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/KotakScoreRead`, { params: { stock } })
      .pipe(catchError(this.handleError));
  }

  getKotakSectorView(sector: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/KotakSectorRead`, { params: { sector } })
      .pipe(catchError(this.handleError));
  }

  getGNewsApi(bqnames: string, dateday5: string, datetoday: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/news`, {
        params: { bqnames, dateday5, datetoday }
      })
      .pipe(catchError(this.handleError));
  }

  getOpstraStockPcr(eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/opstrafetchstockpcr`, { params: { eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  getOpstraStockPcrIntra(eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/opstrafetchstockpcrintra`, { params: { eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  getNtStock1Yr(eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntstock1yr`, { params: { eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  getMmData(stockid: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/mmdata`, { params: { stockid } })
      .pipe(catchError(this.handleError));
  }

  getMmValuation(stockid: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/mmvaluation`, { params: { stockid } })
      .pipe(catchError(this.handleError));
  }

  getNtStockDetails(eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntstockdetails`, { params: { eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  getNtStockPcrDetails(eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntstockpcrdetails`, { params: { eqsymbol } })
      .pipe(catchError(this.handleError));
  }

  getTrendlyne3Fetch(tlid: string, tlname: string, eqsymbol: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/chrometrendlyne`, {
        params: { tlid, tlname, eqsymbol }
      })
      .pipe(catchError(this.handleError));
  }

  getToken(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/get-token`)
      .pipe(catchError(this.handleError));
  }

  initblob(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/initblob`)
      .pipe(catchError(this.handleError));
  }

  blobtest(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/blobtest`)
      .pipe(catchError(this.handleError));
  }

  getTrendlyne2Fetch(tlid: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/trendlyne2`, { params: { tlid } })
      .pipe(catchError(this.handleError));
  }

  getOpstraRefresh(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/opstrarefresh`)
      .pipe(catchError(this.handleError));
  }

  // Analytics Component, Screeners Component
  getTlScreeners(screenercode: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/tlstockscreeners`, { params: { screenercode } })
      .pipe(catchError(this.handleError));
  }

  getTlDvm(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/TLDVMread`)
      .pipe(catchError(this.handleError));
  }

  getTtVolume(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/TTVolumeread`)
      .pipe(catchError(this.handleError));
  }

  getEtIndicesData(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/etallindices`)
      .pipe(catchError(this.handleError));
  }

  getEtAllSectorsData(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/etallsectors`)
      .pipe(catchError(this.handleError));
  }

  getEtPredefinedFilters(selectedValue: string, filter: string, order: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/etpredefinedFilters`, {
        params: { selectedvalue: selectedValue, filter, order }
      })
      .pipe(catchError(this.handleError));
  }

  getEtStockScoreScreeners(selectedValue: string, filter: string, order: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/etstockscorescreeners`, {
        params: { selectedvalue: selectedValue, filter, order }
      })
      .pipe(catchError(this.handleError));
  }

  getNtGlobal(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/globalstocks`)
      .pipe(catchError(this.handleError));
  }

  getTlBuildup(tlid: string): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/trendlynebuildup`, { params: { tlid } })
      .pipe(catchError(this.handleError));
  }

  getTlBuildup5(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/trendlynebuildup5`)
      .pipe(catchError(this.handleError));
  }

  getNtVolumeRead(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntvolumeread`)
      .pipe(catchError(this.handleError));
  }

  // Banknifty Component, Navbar Component
  getNtBankNiftyPcrDetails(): Observable<any> {
    return this.http
      .get<any>(`${this.baseurl}/.netlify/functions/ntbankniftypcr`)
      .pipe(catchError(this.handleError));
  }
}