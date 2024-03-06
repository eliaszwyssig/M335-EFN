import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aufgabe1Page } from './aufgabe1.page';

describe('Aufgabe1Page', () => {
  let component: Aufgabe1Page;
  let fixture: ComponentFixture<Aufgabe1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Aufgabe1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
