import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { ErrorMapper } from '../../mappers/general/error.mapper';
import { Parameter } from 'src/app/models/general/parameter.model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private http: HttpClient, private auth: SessionService,
    private erroMap: ErrorMapper) { }

  public Get(Endpoint: string, params: Parameter[]) {
    return Observable.create((observer: Observer<Array<any>>) => {
      this.http.get(Endpoint)
        .subscribe(
          (success) => {
            if (success) {
              if (success['StatusCode'] === 200) {
                observer.next(success['Result']);
                observer.complete();
              } else {
                observer.error(this.erroMap.transFromServiceError(success));
                observer.complete();
              }
            } else {
              observer.error(success);
              observer.complete();
            }
          }, (error) => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

}
