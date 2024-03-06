import { ComponentFixture, TestBed } from '@angular/core/testing';
import {sjtabPage } from './sjtab.page';

describe('sjtabPage', () => {
  let component: sjtabPage;
  let fixture: ComponentFixture<sjtabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(sjtabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
