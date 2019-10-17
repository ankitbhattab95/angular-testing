import { Component, OnInit } from '@angular/core';
import { OmdbService} from '../omdb.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private omdbService: OmdbService) { }

   movieName:string;
  details={
    title:"batman",
    Poster:"placeholder",
    year:"2005"
  }

  ngOnInit() {
  }

  getMovieDetails(event){
     this.movieName= event.value
    console.log('inside getmoviedetails'+this.movieName)
    this.omdbService.getDetails(this.movieName)
    .subscribe(data => {
        this.details.title=data.Search[0].Title;
        this.details.year=data.Search[0].Year;
        this.details.Poster=data.Search[0].Poster;
        console.log("data")
        console.log(this.details.year)
    })
    // return  this.details
    
  }

}
