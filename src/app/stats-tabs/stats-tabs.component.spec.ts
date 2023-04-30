import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTabsComponent } from './stats-tabs.component';

describe('StatsTabsComponent', () => {
  let component: StatsTabsComponent;
  let fixture: ComponentFixture<StatsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
