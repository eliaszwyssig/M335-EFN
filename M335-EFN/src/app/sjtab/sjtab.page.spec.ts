import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SjtabPage } from './sjtab.page';

describe('Tab1Page', () => {
  let component: SjtabPage;
  let fixture: ComponentFixture<SjtabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(SjtabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
