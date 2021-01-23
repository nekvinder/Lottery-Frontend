import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, Lobby, Lottery, User } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // apiUrl = 'https://radiant-oasis-80551.herokuapp.com/';
  apiUrl = 'https://nekvinder.com:8008/';

  cache = {};

  getUserList(
    offset: number = 0,
    limit: number = 1000
  ): Observable<ApiResponse<User>> {
    return this.getApiResponse<User>(
      this.apiUrl + `user/?offset=${offset}&limit=${limit}`
    );
  }

  async getUserListById(ids: number[]): Promise<User[]> {
    const ret: User[] = [];
    for (const id of ids) ret.push(await this.getUser(id).toPromise());
    return ret;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `user/${id}/`);
  }

  updateUser(data: User): Observable<User> {
    return this.http.patch<User>(this.apiUrl + `user/${data.id}/`, data);
  }

  getLobbyList(
    offset: number = 0,
    limit: number = 1000
  ): Observable<ApiResponse<Lobby>> {
    return this.getApiResponse<Lobby>(
      this.apiUrl + `lobby/?offset=${offset}&limit=${limit}`
    );
  }
  getLobby(id: number): Observable<Lobby> {
    return this.http.get<Lobby>(this.apiUrl + `lobby/${id}/`);
  }
  updateLobby(data: Lobby): Observable<Lobby> {
    return this.http.patch<Lobby>(this.apiUrl + `lobby/${data.id}/`, data);
  }

  getLotteryList(
    offset: number = 0,
    limit: number = 1000
  ): Observable<ApiResponse<Lottery>> {
    return this.getApiResponse<Lottery>(
      this.apiUrl + `lottery/?offset=${offset}&limit=${limit}`
    );
  }

  getLottery(id: number): Observable<Lottery> {
    return this.http.get<Lottery>(this.apiUrl + `lottery/${id}/`);
  }

  updateLottery(data: Lottery): Observable<Lottery> {
    return this.http.patch<Lottery>(this.apiUrl + `lottery/${data.id}/`, data);
  }

  getRunningLotteryByLobby(lobby: Lobby): Observable<ApiResponse<Lottery>> {
    return this.getApiResponse<Lottery>(
      this.apiUrl + `lottery/?lobby=${lobby.id}&limit=1`
    );
  }

  createLottery(lottery: Lottery): Observable<Lottery> {
    return this.http.post<Lottery>(this.apiUrl + `lottery/`, lottery);
  }

  getApiResponse<T>(url: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(url);
  }
}
