import {Component, Input, OnInit} from '@angular/core';
import {SearchService} from '../services/search';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText: string;
  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    const oldValues = this.searchService.searchTextUpdate.getValue();
    this.searchService.changeSearchText(this.searchText, oldValues[1], oldValues[2], oldValues[3], oldValues[4], oldValues[5], oldValues[6], oldValues[7]);
    this.router.navigate([`/broderie/shop`]);
  }
}
