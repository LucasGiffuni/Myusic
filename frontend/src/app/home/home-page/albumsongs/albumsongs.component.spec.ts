import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsongsComponent } from './albumsongs.component';

describe('AlbumsongsComponent', () => {
  let component: AlbumsongsComponent;
  let fixture: ComponentFixture<AlbumsongsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlbumsongsComponent]
    });
    fixture = TestBed.createComponent(AlbumsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
