import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbtabPage } from './lbtab.page';

describe('lbtabPage', () => {
  let component: LbtabPage;
  let fixture: ComponentFixture<LbtabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(LbtabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
