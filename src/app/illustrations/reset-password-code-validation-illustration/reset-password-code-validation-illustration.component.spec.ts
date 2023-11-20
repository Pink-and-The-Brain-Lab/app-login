import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordCodeValidationIllustrationComponent } from './reset-password-code-validation-illustration.component';

describe('ResetPasswordCodeValidationIllustrationComponent', () => {
  let component: ResetPasswordCodeValidationIllustrationComponent;
  let fixture: ComponentFixture<ResetPasswordCodeValidationIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordCodeValidationIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordCodeValidationIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
