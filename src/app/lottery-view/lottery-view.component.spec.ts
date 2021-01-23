import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryViewComponent } from './lottery-view.component';

describe('LotteryViewComponent', () => {
  let component: LotteryViewComponent;
  let fixture: ComponentFixture<LotteryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotteryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
