import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendacaoComponent } from './recomendacao.component';

describe('RecomendacaoComponent', () => {
  let component: RecomendacaoComponent;
  let fixture: ComponentFixture<RecomendacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomendacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomendacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
