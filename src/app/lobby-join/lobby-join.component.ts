import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Lobby, Lottery, User } from '../models/types';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-lobby-join',
  templateUrl: './lobby-join.component.html',
  styleUrls: ['./lobby-join.component.scss'],
})
export class LobbyJoinComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}
  private sub: Subscription;
  participants: User[];
  users: User[];
  loading = false;
  pageSizeCtrl = new FormControl(10);
  page = 1;
  get pageSize() {
    return this.pageSizeCtrl.value;
  }
  collectionSize = 0;
  lobby: Lobby = null;
  lottery: Lottery = null;
  get isRunning() {
    return this.lobby.finished;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(async (params) => {
      let lobbyId = params['lobbyId'];
      let lotteryId = params['id'];
      if (lobbyId) {
        this.lobby = await this.apiService.getLobby(lobbyId).toPromise();
        const lottery: Lottery = { lobby: this.lobby.id };
        const newLottery = await this.apiService
          .createLottery(lottery)
          .toPromise();
        this.router.navigate(['/lottery', newLottery.id]);
      }
      if (lotteryId) {
        this.lottery = await this.apiService.getLottery(lotteryId).toPromise();
        this.lobby = await this.apiService
          .getLobby(this.lottery.lobby)
          .toPromise();
        await this.refreshParticipants();
        await this.refreshNonParticipants();
      }
    });
  }

  private async refreshNonParticipants() {
    this.setNonParticipants(
      (await this.apiService.getUserList().toPromise()).results
    );
  }

  private async refreshParticipants() {
    this.setParticipants(
      await this.apiService.getUserListById(this.lottery.participants)
    );
  }

  private setParticipants(val: User[]) {
    this.collectionSize = val.length;
    this.participants = val;
    this.loading = false;
  }
  async removeParticipant(participant: User) {
    this.lottery.participants = this.lottery.participants.filter(
      (v) => v !== participant.id
    );
    this.apiService.updateLottery(this.lottery).toPromise();
    await this.refreshParticipants();
    await this.refreshNonParticipants();
  }
  async addParticipant(participant: User) {
    if (participant.balance - this.lobby.entryFee < 1) {
      alert('Not enough balance');
      return;
    }
    this.lottery.participants.push(participant.id);
    const resp = await this.apiService.updateLottery(this.lottery).toPromise();
    console.log(resp);
    await this.refreshParticipants();
    await this.refreshNonParticipants();
  }

  private async setNonParticipants(users: User[]) {
    this.collectionSize = users.length;
    const parts = this.participants.map((p) => p.id);
    this.users = users.filter((user) => !parts.includes(user.id));
    this.loading = false;
  }

  async playLottery() {
    this.cutEntryFee();
    const winnerId = Math.floor(Math.random() * this.participants.length) + 1;
    const winner: User = this.participants.filter(
      (user) => user.id == winnerId
    )[0];
    const lobbyAmount = this.lobby.capacity * this.lobby.entryFee;
    console.log(lobbyAmount);
    const winnerAmount = lobbyAmount * 0.95;
    console.log(winnerAmount);
    const houseAmount = lobbyAmount * 0.05;
    console.log(houseAmount);

    winner.balance += winnerAmount;
    this.lottery.houseChargeAmount = houseAmount;
    this.lottery.winner = winnerId;
    this.lobby.finished = true;
    await this.apiService.updateLobby(this.lobby).toPromise();
    for (const user of this.participants)
      await this.apiService.updateUser(user).toPromise();
    await this.apiService.updateLottery(this.lottery).toPromise();
  }

  cutEntryFee() {
    this.participants.forEach((user) => {
      user.balance -= this.lobby.entryFee;
    });
    console.log(this.participants);
  }
}
