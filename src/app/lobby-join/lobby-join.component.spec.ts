import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyJoinComponent } from './lobby-join.component';

describe('LobbyJoinComponent', () => {
  let component: LobbyJoinComponent;
  let fixture: ComponentFixture<LobbyJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
