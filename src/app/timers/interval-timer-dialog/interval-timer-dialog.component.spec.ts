import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTimerDialogComponent } from './interval-timer-dialog.component';

describe('IntervalTimerDialogComponent', () => {
  let component: IntervalTimerDialogComponent;
  let fixture: ComponentFixture<IntervalTimerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalTimerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalTimerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
