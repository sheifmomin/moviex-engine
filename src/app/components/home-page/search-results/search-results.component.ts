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
      let showType = 'mutiple';
      if (showType === '') { showType = 'mutiple'; }
      const searchShow = this.searchQuery;
      this.searchQueryService.getShowsSearchQuery(showType, searchShow).subscribe(value => {
        console.log('Jawed demo');
        console.log(value);
        this.shows = Object.keys(value).map(key => value[key])[0].results;
      });
    }
  }
}

