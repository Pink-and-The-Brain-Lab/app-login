import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResetPasswordCodeValidationService } from './reset-password-code-validation.service';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('ResetPasswordCodeValidationService', () => {
  let service: ResetPasswordCodeValidationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ResetPasswordCodeValidationService,
      ]
    });
    service = TestBed.inject(ResetPasswordCodeValidationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate the code', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true };
    service.validate('').subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.tokenValidation}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
