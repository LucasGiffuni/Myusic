import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSongDialogComponent } from './create-song-dialog.component';

describe('CreateSongDialogComponent', () => {
  let component: CreateSongDialogComponent;
  let fixture: ComponentFixture<CreateSongDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateSongDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSongDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
