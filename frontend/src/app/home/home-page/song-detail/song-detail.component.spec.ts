import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetailComponent } from './song-detail.component';

describe('SongDetailComponent', () => {
  let component: SongDetailComponent;
  let fixture: ComponentFixture<SongDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SongDetailComponent]
    });
    fixture = TestBed.createComponent(SongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
