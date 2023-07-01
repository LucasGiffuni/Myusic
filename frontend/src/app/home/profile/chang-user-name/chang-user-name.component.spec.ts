import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangUserNameComponent } from './chang-user-name.component';

describe('ChangUserNameComponent', () => {
  let component: ChangUserNameComponent;
  let fixture: ComponentFixture<ChangUserNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangUserNameComponent]
    });
    fixture = TestBed.createComponent(ChangUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
