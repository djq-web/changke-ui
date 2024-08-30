import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangkeComponent } from './changke.component';

describe('ChangkeComponent', () => {
  let component: ChangkeComponent;
  let fixture: ComponentFixture<ChangkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangkeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
