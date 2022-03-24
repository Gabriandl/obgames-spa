import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserGameDialogComponent } from './browser-game-dialog.component';

describe('BrowserGameDialogComponent', () => {
  let component: BrowserGameDialogComponent;
  let fixture: ComponentFixture<BrowserGameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowserGameDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserGameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
