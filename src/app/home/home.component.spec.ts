import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OmdbService } from '../omdb.service'
import { HomeComponent } from './home.component';
import { from } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let omdbService: OmdbService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientModule
      ],
      providers: [
        // OmdbService,
      ]
    })
    .compileComponents();
    // omdbService = TestBed.get(OmdbService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', (done) => {  
  //   // jasmine.DEFAULT_TIMEOUT_INTERVAL = 100;
  //   expect(component).toBeTruthy();
  //   // done()
  // }); 

  it('#getMovieDetails() ', (done) => {
  const homeElement: HTMLElement = fixture.nativeElement;
  const input = homeElement.querySelector('input');
    input.value="Batman"
    fixture.detectChanges();
    const a=component.getMovieDetails(input)
    // fixture.whenStable().then(() => {
    // });
    
    setTimeout(function() {
      jasmine.clock().install();
      console.log("year="+component.year)
      fixture.detectChanges();
      expect(component.year).toBeGreaterThanOrEqual(2005);
      expect(component.title).toContain(input.value);
      done();
    }, 2000);





  });
});