import { ComponentFixture, TestBed } from '@angular/core/testing';

import { lbtabPage } from './lbtab.page';

describe('lbtabPage', () => {
  let component: lbtabPage;
  let fixture: ComponentFixture<lbtabPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(lbtabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
