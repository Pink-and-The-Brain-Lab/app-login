import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpCodeValidationIllustrationComponent } from './sign-up-code-validation-illustration.component';

describe('SignUpCodeValidationIllustrationComponent', () => {
  let component: SignUpCodeValidationIllustrationComponent;
  let fixture: ComponentFixture<SignUpCodeValidationIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpCodeValidationIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpCodeValidationIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
