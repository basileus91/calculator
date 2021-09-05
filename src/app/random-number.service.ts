import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RandomNumberService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getRandomNumber(): Observable<number> {
    return this.http.get<number>(`https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new`);
  }
}
