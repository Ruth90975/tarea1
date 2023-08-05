import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListJuegoPage } from './list-juego.page';

describe('ListJuegoPage', () => {
  let component: ListJuegoPage;
  let fixture: ComponentFixture<ListJuegoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
