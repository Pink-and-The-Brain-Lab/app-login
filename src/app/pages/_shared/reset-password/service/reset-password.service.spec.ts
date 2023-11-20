import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResetPasswordService } from './reset-password.service';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ResetPasswordService,
      ]
    });
    service = TestBed.inject(ResetPasswordService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a request for new password', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true };
    service.send('').subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.resetPassword}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
