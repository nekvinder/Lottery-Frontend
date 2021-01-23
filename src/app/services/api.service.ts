import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Lobby, Lottery, User } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://radiant-oasis-80551.herokuapp.com/';
  apiUrl = '127.0.0.1:8000/';

  cache = {};

  // getBranches(
  //   offset: number,
  //   limit: number,
  //   city?: string
  // ): Observable<ApiResponse<Branch>> {
  //   return this.getApiResponse<Branch>(
  //     this.apiUrl +
  //       `branches/?offset=${offset}&limit=${limit}` +
  //       (city ? `&city=${city.toUpperCase()}` : '')
  //   );
  // }

  // getBranch(ifsc: string): Observable<Branch> {
  //   if (this.cache[ifsc]) {
  //     return this.cache[ifsc];
  //   }

  //   this.cache[ifsc] = this.http
  //     .get<Branch>(this.apiUrl + `branches/${ifsc}/`)
  //     .pipe(
  //       shareReplay(1),
  //       catchError((err) => {
  //         delete this.cache[ifsc];
  //         return null;
  //       })
  //     );

  //   return this.cache[ifsc];
  // }

  getUserList(offset: number, limit: number): Observable<ApiResponse<User>> {
    return this.getApiResponse<User>(
      this.apiUrl + `user/?offset=${offset}&limit=${limit}`
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `user/${id}/`);
  }

  getLobbyList(offset: number, limit: number): Observable<ApiResponse<Lobby>> {
    return this.getApiResponse<Lobby>(
      this.apiUrl + `lobby/?offset=${offset}&limit=${limit}`
    );
  }
  getLobby(id: number): Observable<Lobby> {
    return this.http.get<Lobby>(this.apiUrl + `lobby/${id}/`);
  }

  getLotteryList(
    offset: number,
    limit: number
  ): Observable<ApiResponse<Lottery>> {
    return this.getApiResponse<Lottery>(
      this.apiUrl + `lottery/?offset=${offset}&limit=${limit}`
    );
  }
  getLottery(id: number): Observable<Lottery> {
    return this.http.get<Lottery>(this.apiUrl + `user/${id}/`);
  }

  getApiResponse<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(url);
  }
}
