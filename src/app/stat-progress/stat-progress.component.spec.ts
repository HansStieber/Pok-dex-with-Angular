import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatProgressComponent } from './stat-progress.component';

describe('StatProgressComponent', () => {
  let component: StatProgressComponent;
  let fixture: ComponentFixture<StatProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
