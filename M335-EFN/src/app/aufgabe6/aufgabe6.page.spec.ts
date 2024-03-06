import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe6Page } from './aufgabe6.page';

describe('Aufgabe6Page', () => {
  let component: Aufgabe6Page;
  let fixture: ComponentFixture<Aufgabe6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Aufgabe6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
