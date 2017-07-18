import { Injectable } from '@angular/core';
import { PROPUBLICA_API_KEY } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import * as madison from 'madison';
import * as zipcodes from 'zipcodes';


@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  legislators: any[];

  getSenators(inputLocation: string) {
    let newLocation: string;
    var headers = new Headers();
    headers.append('X-API-Key', PROPUBLICA_API_KEY);

    if (isNaN(parseFloat(inputLocation))) {
      const stringLength = inputLocation.length;
      if (stringLength > 2) {
        newLocation = madison.getStateAbbrevSync(inputLocation);
      } else {
        newLocation = inputLocation;
      }
    } else if (!isNaN(parseFloat(inputLocation))) {
      newLocation = zipcodes.lookup(inputLocation).state;
    }
    this.http.get(`https://api.propublica.org/congress/v1/members/senate/${newLocation}/current.json`,
      { headers: headers }).subscribe((data) => {
        this.legislators = data.json().results;
        console.log(this.legislators);
      });
    }
  }

  // getReps(state: string, district: string) {
  //   var headers = new Headers();
  //   headers.append('X-API-Key', PROPUBLICA_API_KEY);
  //   this.http.get(`https://api.propublica.org/congress/v1/members/house/${state}/${district}/current.json`,
  //   { headers: headers }).subscribe((data) => {
  //     this.legislators = data.json().results;
  //     console.log(this.legislators);
  //   });
  // }
