import { Injectable } from '@angular/core';
import { PROPUBLICA_API_KEY } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';


@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  headers = new Headers();
  legislators: any[];

  getRepresentatives(state: string) {
    this.headers.append('X-API-Key', PROPUBLICA_API_KEY);
    this.http.get(`https://api.propublica.org/congress/v1/members/senate/${state}/current.json`,
    { headers: this.headers }).subscribe((data) => {
      this.legislators = data.json().results;
      console.log(this.legislators);
    });
  }
}
