import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresRecruteurComponent } from './offres-recruteur.component';

describe('OffresRecruteurComponent', () => {
  let component: OffresRecruteurComponent;
  let fixture: ComponentFixture<OffresRecruteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffresRecruteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffresRecruteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
