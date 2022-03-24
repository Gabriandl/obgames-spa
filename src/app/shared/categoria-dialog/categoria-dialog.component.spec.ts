import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDialogComponent } from './categoria-dialog.component';

describe('CategoriaDialogComponent', () => {
  let component: CategoriaDialogComponent;
  let fixture: ComponentFixture<CategoriaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
