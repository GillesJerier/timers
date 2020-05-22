import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalTrainingComponent } from './interval-training.component';

describe('IntervalTrainingComponent', () => {
  let component: IntervalTrainingComponent;
  let fixture: ComponentFixture<IntervalTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
