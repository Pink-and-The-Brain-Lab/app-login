import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewPasswordIllustrationComponent } from './create-new-password-illustration.component';

describe('CreateNewPasswordIllustrationComponent', () => {
  let component: CreateNewPasswordIllustrationComponent;
  let fixture: ComponentFixture<CreateNewPasswordIllustrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewPasswordIllustrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPasswordIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
