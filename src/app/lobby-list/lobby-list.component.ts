import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiResponse, Lobby, Lottery } from '../models/types';
import { ApiService } from '../services/api.service';
function searchLobbyList(data: Lobby[], text: string): Lobby[] {
  return data.filter((lobby) => {
    const term = text.toLowerCase();
    return (
      lobby.name.toLowerCase().includes(term) ||
      lobby.capacity.toString().toLowerCase().includes(term) ||
      lobby.entryFee.toString().toLowerCase().includes(term)
    );
  });
}

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss'],
})
export class LobbyListComponent {
  lobbyList$: Observable<Lobby[]>;
  filter = new FormControl('');
  pageSizeCtrl = new FormControl(10);
  loading = false;

  constructor(private apiService: ApiService) {
    this.refreshLobbyList();
  }

  routerLinks = {};

  async getRouterLinkForLobby(lobby: Lobby) {
    if (!lobby.finished) {
      const lottery: ApiResponse<Lottery> = await this.apiService
        .getRunningLotteryByLobby(lobby)
        .toPromise();
      return ['/lottery', lottery.results[0].id];
    } else return ['/lottery', 'new', lobby.id];
  }
  page = 1;
  get pageSize() {
    return this.pageSizeCtrl.value;
  }
  collectionSize = 0;

  async refreshLobbyList() {
    this.loading = true;
    const val = await this.apiService
      .getLobbyList(this.pageSize * (this.page - 1), this.pageSize)
      .toPromise();
    this.collectionSize = val.count;
    this.setLobbyList(val);
    for (const res of val.results)
      this.routerLinks[res.id] = await this.getRouterLinkForLobby(res);
  }

  private setLobbyList(val: ApiResponse<Lobby>) {
    this.lobbyList$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => searchLobbyList(val.results, text))
    );
    this.loading = false;
  }
}
