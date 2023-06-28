import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToAlbumComponent } from './add-to-album.component';

describe('AddToAlbumComponent', () => {
  let component: AddToAlbumComponent;
  let fixture: ComponentFixture<AddToAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddToAlbumComponent]
    });
    fixture = TestBed.createComponent(AddToAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
