import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSellsComponent } from './report-sells.component';

describe('ReportSellsComponent', () => {
  let component: ReportSellsComponent;
  let fixture: ComponentFixture<ReportSellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
