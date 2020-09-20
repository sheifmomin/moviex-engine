import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Crime', 'Thriller', 'Sci-Fi', 'Mystery', 'Drama', 'Horror'];

  constructor(private genreService: GenreService) { }

  ngOnInit(): void {
    this.genreService.getAllGenre().subscribe(value => {
      Object.keys(value).map(key => {
        const combined = value[key][0].genres.concat(value[key][1].genres);
        const genreMap = new Map();
        combined.forEach(element => {
          genreMap.set(element.id, element.name);
        });
        genreMap.forEach(element => {
          this.toppingList.push(element);
        });
      });
    });
  }
}
