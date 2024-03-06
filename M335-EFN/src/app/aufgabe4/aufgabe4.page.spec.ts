import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe4Page } from './aufgabe4.page';

describe('Aufgabe4Page', () => {
  let component: Aufgabe4Page;
  let fixture: ComponentFixture<Aufgabe4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Aufgabe4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
