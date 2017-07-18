import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import * as madison from 'madison';
import * as congressionalDistricts from 'congressional-districts';
import * as zipcodes from 'zipcodes';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

newLocation: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitForm(chamber: string, inputLocation: string) {
    if ((chamber === 'senate') && (isNaN(parseFloat(inputLocation)))) {
      let stringLength = inputLocation.length;
      // console.log(stringLength);
      if (stringLength > 2) {
        this.newLocation = madison.getStateAbbrevSync(inputLocation);
      } else {
        this.newLocation = inputLocation;
      }
    } else if ((chamber === 'senate') && (!isNaN(parseFloat(inputLocation)))) {
      this.newLocation = zipcodes.lookup(inputLocation).state;
    }
    this.searchService.getSenators(this.newLocation);
  }
}
