import { Component } from '@angular/core';
// import SpendJson from './users.json';

// interface SPENDS { 
//   account_name: string;
//   service_name: string;
//   ressource_id: String;
//   cost: number;
//   period_start: String;
//   period_end: String;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-demo';

  // Spends: SPENDS[] = SpendJson;
  constructor() {
    // console.log(this.Spends);
  }


}
