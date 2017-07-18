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

  legislators: any[] = null;

  submitForm(chamber: string, inputLocation: string) {
    if (chamber === 'senate') {
      this.legislators = this.searchService.getSenators(inputLocation);
    } else {
      this.legislators = this.searchService.getReps(inputLocation);
    }
  }
}
