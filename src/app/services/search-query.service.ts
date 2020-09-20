import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(private http: HttpClient) { }

  public getShowsSearchQuery(showType: string, searchShow: string) {
    return this.http.get(`http://localhost:3000/general/${showType}`, {
      params: {
        searchQuery: searchShow
      }
    });
  }
}
