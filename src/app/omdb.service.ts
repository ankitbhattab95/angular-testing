import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  
  private omdbUrl = 'http://www.omdbapi.com/?apikey=a353b277&s=';  
  request:string;
  constructor(private http: HttpClient) { }


  
  getDetails (movieName){
    this.request=this.omdbUrl+movieName;
    return this.http.get<any>(this.request)
  }
}

