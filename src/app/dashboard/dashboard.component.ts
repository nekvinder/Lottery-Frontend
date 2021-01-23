import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Lobby, Lottery, User } from '../models/types';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private api: ApiService) {}
  lottries: Lottery[];
  users: User[];
  lobbies: Lobby[];
  loading = false;
  collectionSize = 0;
  async ngOnInit() {
    const res = await this.api.getLotteryList().toPromise();
    this.users = (await this.api.getUserList().toPromise()).results;
    this.lobbies = (await this.api.getLobbyList().toPromise()).results;
    this.collectionSize = res.count;
    this.lottries = res.results;
  }
  getLobby(id: number) {
    return this.lobbies.filter((v) => v.id == id)[0];
  }
  getUser(id: number) {
    return this.users.filter((v) => v.id == id)[0];
  }
  get totalAmt() {
    let i = 0;
    this.lottries.forEach((element) => {
      i += parseFloat(element.houseChargeAmount.toString()) ?? 0;
    });
    return i;
  }
}
