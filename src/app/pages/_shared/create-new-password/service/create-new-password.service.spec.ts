import { fakeAsync, TestBed } from '@angular/core/testing';
import { CreateNewPasswordService } from './create-new-password.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IResetInterface } from '../models/reset-password.interface';
import { IDefaultResponse } from 'src/app/commons/models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('CreateNewPasswordService', () => {
  let service: CreateNewPasswordService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        CreateNewPasswordService,
      ]
    });
    service = TestBed.inject(CreateNewPasswordService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send new password', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true };
    service.send({} as IResetInterface).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.createPassword}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
