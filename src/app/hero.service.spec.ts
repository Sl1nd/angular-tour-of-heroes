import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  let heroService: HeroService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    heroService = TestBed.get(HeroService);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });
});
