import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { SearchQueryService } from '../../../services/search-query.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnChanges {

  @Input() public searchQuery: any;
  public shows = [];
  constructor(private searchQueryService: SearchQueryService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.searchQuery) {
      this.shows = [];
      let showType = this.searchQuery.showtype.toString();
      if (showType === '') { showType = 'mutiple'; }
      const searchShow = this.searchQuery.search.toString();
      this.searchQueryService.getShowsSearchQuery(showType, searchShow).subscribe(value => {
        this.shows = Object.keys(value).map(key => value[key])[0].results;
        console.log(this.shows);
      });
    }

  }

}

