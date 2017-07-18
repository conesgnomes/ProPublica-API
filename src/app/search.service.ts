import { Injectable } from '@angular/core';
import { PROPUBLICA_API_KEY } from './api-keys';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import * as madison from 'madison';
import * as zipcodes from 'zipcodes';
import * as districts from 'congressional-districts';


@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  districts: any[];

  getSenators(inputLocation: string) {
    let legislators: any[] = [];
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
        legislators.push(data.json().results[0]);
        legislators.push(data.json().results[1]);
      });
      // console.log(legislators);
      return legislators;
    }

  getReps(inputLocation: string) {
    let legislators: any[] = [];
    let stateAbbrev: string;
    var headers = new Headers();
    headers.append('X-API-Key', PROPUBLICA_API_KEY);
    if (isNaN(parseFloat(inputLocation))) {
      const stringLength = inputLocation.length;
      if (stringLength > 2) {
        stateAbbrev = madison.getStateAbbrevSync(inputLocation);
      } else {
        stateAbbrev = inputLocation;
      }
      let numberOfDistricts = districts.getNumOfDistricts(madison.getStateNameSync(stateAbbrev));
      this.districts = Array.from(Array(numberOfDistricts), (val,index) => index+1);
    } else {
      this.districts = districts.getDistricts(inputLocation).length === 0 ? [1] : districts.getDistricts(inputLocation);
      stateAbbrev = zipcodes.lookup(inputLocation).state;
    }

    this.districts.forEach((district) => {
      return this.http.get(`https://api.propublica.org/congress/v1/members/house/${stateAbbrev}/${district}/current.json`,
      { headers: headers }).subscribe((data) => {
        legislators.push(data.json().results[0]);
      });
    })
    console.log(legislators);
    return legislators;
  }
}
