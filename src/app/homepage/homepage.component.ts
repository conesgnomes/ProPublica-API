import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitForm(chamber: string, inputLocation: string) {
    if (chamber === 'senate') {
      this.searchService.getSenators(inputLocation);
    } else {
      this.searchService.getReps(inputLocation);
    }
  }
}
