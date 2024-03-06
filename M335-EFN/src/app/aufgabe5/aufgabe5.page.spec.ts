import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe5Page } from './aufgabe5.page';

describe('Aufgabe5Page', () => {
  let component: Aufgabe5Page;
  let fixture: ComponentFixture<Aufgabe5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Aufgabe5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
