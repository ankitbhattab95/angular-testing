import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  
  omdbUrl = 'http://www.omdbapi.com/?apikey=a353b277&s=';  
  request:string;
  constructor(private http: HttpClient) { }


  
  getDetails (movieName):Observable<any>{
    this.request=this.omdbUrl+movieName;
    return (this.http.get<any>(this.request))
  }
}

