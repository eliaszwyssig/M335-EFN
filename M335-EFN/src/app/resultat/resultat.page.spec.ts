import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultatPage } from './resultat.page';

describe('ResultatPage', () => {
  let component: ResultatPage;
  let fixture: ComponentFixture<ResultatPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(ResultatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
