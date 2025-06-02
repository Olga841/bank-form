import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDocuments } from './additional-documents';

describe('AdditionalDocuments', () => {
  let component: AdditionalDocuments;
  let fixture: ComponentFixture<AdditionalDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalDocuments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalDocuments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
