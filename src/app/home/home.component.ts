import { Component, OnInit } from '@angular/core';
import { OmdbService} from '../omdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private omdbService: OmdbService) { }
  title:string;
  Poster:string;
  year:string;

  ngOnInit() {
  }

  getMovieDetails(event){

    this.omdbService.getDetails(event.value)
    .subscribe(data => {
      if(data.Search !== undefined)
      {
        this.title=data.Search[0].Title;
        this.year=data.Search[0].Year;
        this.Poster=data.Search[0].Poster;
      }
    })
    
  }

}
