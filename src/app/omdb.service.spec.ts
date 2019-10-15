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


  describe('#getMovieDetails', () => {

    let expectedDetails: any
    beforeEach(() => {
      omdbService = TestBed.get(OmdbService);
      expectedDetails={
        year: '2005'
      }
      
    });

    it('should return expected movie details (called once)', () => {
      omdbService.getDetails("tttt").subscribe(
        data => console.log('asaasasa'),
        data => expect(data).toEqual(expectedDetails)
      );

      const req = httpTestingController.expectOne(omdbService.request);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedDetails);
    });

    
   
  });
});


