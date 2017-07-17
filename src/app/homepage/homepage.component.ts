import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

newState: string;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitForm(state: string) {
    this.newState = state;
    this.searchService.getRepresentatives(this.newState);
  }

}
