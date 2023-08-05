import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPalabrasPage } from './add-palabras.page';

describe('AddPalabrasPage', () => {
  let component: AddPalabrasPage;
  let fixture: ComponentFixture<AddPalabrasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddPalabrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
