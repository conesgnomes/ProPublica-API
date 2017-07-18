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

  legislators: any[];
  zipsInState: any[];
  districts: any[];

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

  getReps(inputLocation: string) {
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
      this.http.get(`https://api.propublica.org/congress/v1/members/house/${stateAbbrev}/${district}/current.json`,
      { headers: headers }).subscribe((data) => {
        this.legislators = data.json().results;
        console.log(this.legislators);
      });
    })

  }
}
