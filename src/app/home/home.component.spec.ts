import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { OmdbService } from '../omdb.service'
import { HomeComponent } from './home.component';
import { MockData } from '../data.mock';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let omdbService: OmdbService;

   class MockOmdbService {
    getDetails (name): any{
      return of(MockData.data);
    } 
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
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
  });



  it('#getMovieDetails()', (done) => {
    
    const homeElement: HTMLElement = fixture.nativeElement;
    const input = homeElement.querySelector('input');
    input.value="Batman"
    fixture.detectChanges();
    component.getMovieDetails(input)

    setTimeout(function() {
      jasmine.clock().install();
      fixture.detectChanges();
     
     
      expect(component.movieName).toEqual(input.value);  //check the data binding of movieName between the view and component  
      
     
      expect(component.details.title).toBe(MockData.data.Search[0].Title);    //check if movie details are fetched correctly
      expect(component.details.Poster).toBe(MockData.data.Search[0].Poster);
      expect(component.details.year).toBe(MockData.data.Search[0].Year);
      
      done();
    }, 1000);
  });


});