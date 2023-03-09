import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  constructor(private http: HttpClient) { }


  Getchartinfo() {
    return this.http.get("http://localhost:3000/spend")
  }

}
