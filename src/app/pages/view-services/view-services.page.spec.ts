import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewServicesPage } from './view-services.page';

describe('ViewServicesPage', () => {
  let component: ViewServicesPage;
  let fixture: ComponentFixture<ViewServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
