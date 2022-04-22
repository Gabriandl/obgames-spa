import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserGameDetailComponent } from './browser-game-detail.component';

describe('BrowserGameDetailComponent', () => {
  let component: BrowserGameDetailComponent;
  let fixture: ComponentFixture<BrowserGameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserGameDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserGameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
