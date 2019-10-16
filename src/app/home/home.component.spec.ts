import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HomeComponent } from './home.component';

describe('AppComponent', () => {
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
    
      ],
      declarations: [
        HomeComponent
      ],
    }).compileComponents();
    // httpClient = TestBed.get(HttpClient);

  }));
  
  it('should create the homecomponent', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });



});
