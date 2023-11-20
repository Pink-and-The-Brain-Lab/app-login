import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignUpService } from './sign-up.service';
import { ISignup } from '../models/signup.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('SignUpService', () => {
  let service: SignUpService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        SignUpService,
      ]
    });
    service = TestBed.inject(SignUpService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send data to signup', fakeAsync(() => {
    const responseMock: ISignup = {
      email: 'email@mail.com',
      name: 'Andre',
      password: '123456',
      confirmPassword: '123456',
      allowZellimCommunicate: true,
      recieveInformation: true,
   }
    service.signUp({} as ISignup).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.signUp}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
