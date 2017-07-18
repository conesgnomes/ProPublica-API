import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import * as madison from 'madison';
import * as zipcodes from 'zipcodes';
import * as districts from 'congressional-districts';
import * as zcta from 'us-zcta-counties';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

newLocation: string;
zipsInState: any[];
districts: any[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitForm(chamber: string, inputLocation: string) {
    if (chamber === 'senate') {
      this.searchService.getSenators(inputLocation);
    }
  }
}




    // } else if ((chamber === 'house') && (isNaN(parseFloat(inputLocation)))) {
    //   const stringLength = inputLocation.length;
    //   if (stringLength > 2) {
    //     this.newLocation = madison.getStateAbbrevSync(inputLocation);
    //   } else {
    //     this.newLocation = inputLocation;
    //   }
    //   this.zipsInState = zcta.find({state: this.newLocation});
    //   this.zipsInState.forEach(function(zip) {
    //     this.districts.push(districts.getDistricts(zip));
    //   });
    //   this.districts.forEach((district) => {
    //     this.searchService.getReps(this.newLocation, district);
    //   });
    // } else {
    //   this.districts = districts.getDistricts(inputLocation);
    //   this.newLocation = zipcodes.lookup(inputLocation).state;
    //   this.districts.forEach((district) => {
    //     this.searchService.getReps(this.newLocation, district);
    //   });
    //   console.log(this.districts);
    // }
// }
