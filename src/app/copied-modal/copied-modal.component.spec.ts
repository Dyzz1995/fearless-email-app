import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopiedModalComponent } from './copied-modal.component';

describe('CopiedModalComponent', () => {
  let component: CopiedModalComponent;
  let fixture: ComponentFixture<CopiedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CopiedModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopiedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
