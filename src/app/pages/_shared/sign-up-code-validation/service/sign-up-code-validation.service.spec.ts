import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpCodeValidationService } from './sign-up-code-validation.service';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('SignUpCodeValidationService', () => {
  let service: SignUpCodeValidationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SignUpCodeValidationService,
      ]
    });
    service = TestBed.inject(SignUpCodeValidationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate code', fakeAsync(() => {
    const responseMock = 'ok';
    service.validate('1234').subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.tokenValidation}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));

  it('should create new code', fakeAsync(() => {
    const responseMock = 'ok';
    service.generateNewToken('email@mail.com').subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.generateNewToken}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
