import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LobbyJoinComponent } from './lobby-join/lobby-join.component';
import { LobbyListComponent } from './lobby-list/lobby-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'lobby', component: LobbyListComponent },
  { path: 'lottery/new/:lobbyId', component: LobbyJoinComponent },
  { path: 'lottery/:id', component: LobbyJoinComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
