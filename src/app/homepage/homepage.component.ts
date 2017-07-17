import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [SearchService]
})
export class HomepageComponent implements OnInit {

newZip: number;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  submitForm(zip: number) {
    this.newZip = zip;
    this.searchService.getRepresentatives(this.newZip);
  }

}
