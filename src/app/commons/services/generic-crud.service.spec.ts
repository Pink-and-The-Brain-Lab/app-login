import { TestBed, fakeAsync } from '@angular/core/testing';
import { GenericCRUDService } from './generic-crud.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IDefaultResponse } from '../models/default-response.interface';
import { environment } from 'src/environments/environment';
import { API_PATH } from 'src/app/constants/api-path';

describe('GenericCRUDService', () => {
  let service: GenericCRUDService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        GenericCRUDService,
      ]
    });
    service = TestBed.inject(GenericCRUDService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call post method', fakeAsync(() => {
    const responseMock: IDefaultResponse = { success: true };
    service.genericPost(`${API_PATH.createPassword}`, {}).subscribe({
      next: response => {
        expect(response).toEqual(responseMock);
      }
    });

    const req = httpController.expectOne(`${environment.baseUlr}${API_PATH.createPassword}`);
    expect(req.request.method).toEqual('POST');
    req.flush(responseMock);
  }));
});
