import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { OmdbService } from './omdb.service'


describe('OmdbService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let omdbService: OmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        OmdbService,
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    omdbService = TestBed.get(OmdbService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  describe('test suite for getDetails() of omdbService', () => {
    
    let expectedDetails: any
    beforeEach(() => {
      omdbService = TestBed.get(OmdbService);
      expectedDetails={
        year: '2005'
      }
      
    });
    
    it('should return expected movie details (called once)', () => {
      let testMovieName= "batman"
      omdbService.getDetails(testMovieName).subscribe(
        // data => console.log('asaasasa'),
        data => expect(data).toEqual(expectedDetails)
      );

      const req = httpTestingController.expectOne('http://www.omdbapi.com/?apikey=a353b277&s='+testMovieName);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedDetails);
    });


    it('should be OK returning no matching movies', () => {
      let testMovieName= "noMatchingMovieName"
      let res = {"Response":"False","Error":"Movie not found!"}
      
      omdbService.getDetails(testMovieName).subscribe(
        data => expect(data).toEqual(res),
        fail
      );

      const req = httpTestingController.expectOne('http://www.omdbapi.com/?apikey=a353b277&s='+testMovieName);
      req.flush(res); // Respond with no movies
    });
    
   

    it('should return expected movies (called multiple times)', () => {
      let testMovieName= "noMatchingMovieName"
      
      omdbService.getDetails(testMovieName).subscribe();
      omdbService.getDetails(testMovieName).subscribe();
      
      omdbService.getDetails(testMovieName).subscribe(
        data => expect(data).toEqual(1),
        fail
      );

      const requests = httpTestingController.match('http://www.omdbapi.com/?apikey=a353b277&s='+testMovieName);
      expect(requests.length).toEqual(3);

      // Respond to each request with different mock movie results
      requests[0].flush([]);
      requests[1].flush([{name: 'batman',year:'2005'}]);
      requests[2].flush(1);
    });



  });
});


