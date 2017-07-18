import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { LegislatorService } from '../legislator.service';
import { Legislator } from '../legislator.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService, LegislatorService]
})
export class HomepageComponent implements OnInit {

  constructor(private searchService: SearchService, private legislatorService: LegislatorService) { }

  ngOnInit() {
  }

  legislators: any[] = null;

  house: boolean = false;
  senate: boolean = false;

  submitForm(chamber: string, inputLocation: string) {
    if (chamber === 'senate') {
      this.senate = true;
      this.legislators = this.searchService.getSenators(inputLocation);
    } else {
      this.house = true;
      this.legislators = this.searchService.getReps(inputLocation);
    }
  }

  saveLegislator(name: string, party: string, district: string){
    let newLegislator: Legislator = new Legislator(name, party, district);
    this.legislatorService.addLegislator(newLegislator);
    alert('Your legislator has been saved, yo!')
  }
}
