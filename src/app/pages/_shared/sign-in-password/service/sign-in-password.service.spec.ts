import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignInPasswordService } from './sign-in-password.service';
import { ISignin } from '../models/sign-in.interface';
import { ISigninResponse } from '../models/sign-in-response.interface';
import { IUser } from '../models/user.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

const userMock: IUser = {
  id: '123',
  email: 'email@mail.com',
  name: 'Adre',
  validated: true,
};

const responseMock: ISigninResponse = {
  user: userMock,
  token: '123456',
};

describe('SignInPasswordService', () => {
  let service: SignInPasswordService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SignInPasswordService,
      ]
    });
    service = TestBed.inject(SignInPasswordService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate the code', fakeAsync(() => {
    service.signIn({} as ISignin).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.signIn}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
