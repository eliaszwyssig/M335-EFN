import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe2Page } from './aufgabe2.page';

describe('Aufgabe2Page', () => {
  let component: Aufgabe2Page;
  let fixture: ComponentFixture<Aufgabe2Page>;

  beforeEach((() => {
    fixture = TestBed.createComponent(Aufgabe2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
