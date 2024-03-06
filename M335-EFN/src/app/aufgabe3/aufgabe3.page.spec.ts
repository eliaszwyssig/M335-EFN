import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe3Page } from './aufgabe3.page';

describe('Aufgabe3Page', () => {
  let component: Aufgabe3Page;
  let fixture: ComponentFixture<Aufgabe3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Aufgabe3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
