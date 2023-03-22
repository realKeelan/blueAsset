import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private token: TokenService) {}

  getLeaveSummary() {
    // const headers = new HttpHeaders().set('x-token', 'bdbufh2834982dhsqdad23fef-2f3fbasbc1vsd');
    return this.http
      .post<any>(
        'https://blueassetmonitoring.com/testbed/user/get-summary-data',
        {},
        // { headers }
      )
  }

  getLeaveRequest(leaveData : any){
    // const headers = new HttpHeaders().set('x-token', this.token.TOKEN_KEY);
    return this.http
      .post<any>(
        'https://blueassetmonitoring.com/testbed/user/create-leave-request',
        leaveData,
        // { headers }
      )
  }

  getOriginalData(){
    // const headers = new HttpHeaders().set('x-token', this.token.TOKEN_KEY);
    return this.http
      .post<any>(
        'https://blueassetmonitoring.com/testbed/user/reset-data',
        {},
        // { headers }
      )
  }
}
