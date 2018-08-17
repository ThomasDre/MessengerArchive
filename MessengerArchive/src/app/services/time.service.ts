import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }

  /**
   * A date in string format ('DD.MM.YY, HH:mm') is parsed and an appropriate Date object is returned.
   */
  public parseTimeStamp(timestamp: string): Date {
    let date: Date = new Date();
    date.setDate(Number.parseInt(timestamp.substr(0,2)));
    date.setMonth(Number.parseInt(timestamp.substr(3,2)));
    date.setFullYear(Number.parseInt(timestamp.substr(6,2)));
    date.setHours(Number.parseInt(timestamp.substr(10,2)));
    date.setMinutes(Number.parseInt(timestamp.substr(13,2)));
    //alert(date.getFullYear() + " " + date.getMonth() + " " + date.getDate() + " " + date.getHours() + " " + date.getMinutes());
    return date;
  }

  /**
   * 2 Date Objects are compared.
   * @param isBigger first date object (!= NULL)
   * @param than sencond date object (!= NULL)
   * @returns true iff 'isBigger' represents a later date compared to 'than'
   *          else false is returned
   */
  public compareYYYYMMDD(isBigger: Date, than: Date): boolean {
    let date1: number = Number.parseInt(isBigger.toISOString().slice(0,10).replace(/-/g, ""));
    let date2: number = Number.parseInt(than.toISOString().slice(0,10).replace(/-/g, ""));
    if (date1 > date2) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Date is returned in format of YYYYMMDD
   */
  public getYYYYMMDD(date: Date): string {
    return date.toISOString().slice(0,10).replace(/-/g, "");
  }


  /**
   * The name of a month is returned for a given numeric representation of a month.
   * @param month number (1-12)
   */
  public monthAsString(month: number): string {
    let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "Novermber", "Dezember"];
    return months[month-1];
  }
}
