import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordIllustrationComponent } from './reset-password-illustration.component';

describe('ResetPasswordIllustrationComponent', () => {
  let component: ResetPasswordIllustrationComponent;
  let fixture: ComponentFixture<ResetPasswordIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
