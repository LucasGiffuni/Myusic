import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangpaswordComponent } from './changpasword.component';

describe('ChangpaswordComponent', () => {
  let component: ChangpaswordComponent;
  let fixture: ComponentFixture<ChangpaswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangpaswordComponent]
    });
    fixture = TestBed.createComponent(ChangpaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
