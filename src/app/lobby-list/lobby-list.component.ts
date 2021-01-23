import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiResponse, Lobby } from '../models/types';
import { ApiService } from '../services/api.service';
import { LocalUtilService } from '../services/local-util.service';
function searchLobbyList(data: Lobby[], text: string): Lobby[] {
  return data.filter((lobby) => {
    const term = text.toLowerCase();
    return (
      lobby.name.toLowerCase().includes(term) ||
      lobby.capacity.toString().toLowerCase().includes(term) ||
      lobby.entryFee.toString().toLowerCase().includes(term) ||
    );
  });
}

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss'],
})
export class LobbyListComponent {
  branches$: Observable<Lobby[]>;
  filter = new FormControl('');
  pageSizeCtrl = new FormControl(10);
  city = new FormControl('Mumbai');
  loading = false;

  constructor(
    private apiService: ApiService,
    private localUtilService: LocalUtilService
  ) {
    this.refreshLobbyList();
  }
  page = 1;
  get pageSize() {
    return this.pageSizeCtrl.value;
  }
  collectionSize = 0;

  refreshLobbyList() {
    this.loading = true;
    this.apiService
      .getLobbyList(this.pageSize * (this.page - 1), this.pageSize)
      .toPromise()
      .then((val) => {
        this.collectionSize = val.count;
        this.setLobbyList(val);
      });
  }

  private setLobbyList(val: ApiResponse<Lobby>) {
    this.branches$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) =>
        searchLobbyList(
          val.results,
          text
        )
      )
    );
    this.loading = false;
  }
}
