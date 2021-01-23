import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LobbyJoinComponent } from './lobby-join/lobby-join.component';
import { LobbyListComponent } from './lobby-list/lobby-list.component';

const routes: Routes = [
  // { path: 'banks', component: BanksListComponent },
  { path: 'lobby/', component: LobbyListComponent },
  { path: 'lobby/:id', component: LobbyJoinComponent },
  { path: '**', redirectTo: 'lobby' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
