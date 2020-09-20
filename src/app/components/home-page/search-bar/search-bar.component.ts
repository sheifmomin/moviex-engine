import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchQueryService } from '../../../services/search-query.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public shows: any;
  @Output() public searchQuery = new EventEmitter();
  @Output() public filterSelected = new EventEmitter();
  myControl = new FormControl();
  options: string[] = [];
  filter = false;
  constructor(private searchQueryService: SearchQueryService) { }

  ngOnInit(): void { }

  public submit(event) {
    this.searchQuery.emit(event.target.value);
  }

  public selectFromDropDown(searchParams) {
    this.searchQuery.emit(searchParams);
  }

  public filterClick() {
    this.filter = !this.filter;
    this.filterSelected.emit(this.filter);
  }

  public onKeyPressSearch(event) {
    const searchQuery = event.target.value;
    this.options = [];
    if (searchQuery !== '') {
      if (searchQuery) {
        this.shows = [];
        const showType = 'mutiple';
        const searchShow = searchQuery;
        this.searchQueryService.getShowsSearchQuery(showType, searchShow).subscribe(value => {
          console.log('Jawed demo');
          console.log(value);
          this.shows = Object.keys(value).map(key => value[key])[0].results;
        });
      }
    }
  }
}
