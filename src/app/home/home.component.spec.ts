import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { OmdbService } from '../omdb.service'
import { HomeComponent } from './home.component';
import { Data } from '../data.mock';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let omdbService: OmdbService;
  let httpTestingController: HttpTestingController;

   class MockOmdbService {
    getDetails (name): any{
      console.log('from mock')
      return ({ subscribe: () => {} })
      // return of(Data.data);
    } 
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        // httpTestingController
      ],
      providers: [
        {provide: OmdbService, useClass: MockOmdbService }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    omdbService = TestBed.get(OmdbService);
    // httpTestingController = TestBed.get(HttpTestingController);

  });


  //  it('should create', () => {  
  //        expect(component).toBeTruthy();
  //     }); 
    

  it('#getMovieDetails()', (done) => {
    
    const homeElement: HTMLElement = fixture.nativeElement;
    const input = homeElement.querySelector('input');
    input.value="Batman"
    fixture.detectChanges();
    const a =   component.getMovieDetails(input)
      //  expect(input.value).toEqual("Batman");
 
    setTimeout(function() {
      jasmine.clock().install();
      fixture.detectChanges();
     
      //check the data binding of movieName between the view and component
      expect(component.movieName).toEqual(input.value);
      
      //check if movie details are fetched correctly
      expect(a.title).toBe(component.details.title);
      expect(a.Poster).toBe(component.details.Poster);
      expect(a.year).toBe(component.details.year);
      
      done();
    }, 1000);
  });


});