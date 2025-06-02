import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAddress } from './registration-address';

describe('RegistrationAddress', () => {
  let component: RegistrationAddress;
  let fixture: ComponentFixture<RegistrationAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
