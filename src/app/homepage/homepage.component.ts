import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import * as madison from 'madison';

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
    let stringLength = state.length;
    console.log(stringLength);
    if (stringLength > 2) {
      this.newState = madison.getStateAbbrevSync(state);
    } else {
      this.newState = state;
    }
    this.searchService.getSenators(this.newState);
  }
}
