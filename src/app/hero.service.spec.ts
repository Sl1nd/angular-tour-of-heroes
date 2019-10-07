import { TestBed } from '@angular/core/testing';
import {Hero} from '../app/hero';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HeroService', () => {
  let heroService: HeroService;
  let msgServiceSpy: MessageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [{ provide: MessageService, useValue: spy }],
      imports: [HttpClientTestingModule]
    });

    heroService = TestBed.get(HeroService);
    msgServiceSpy = TestBed.get(MessageService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should get heroes', () => {
    const expectedHeroes = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
    ] as Hero[];

    heroService.getHeroes()
      .subscribe(data =>
        // When observable resolves, result should match test data
        expect(data).toEqual(expectedHeroes)
      );

    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedHeroes);
  });

  it('should handle request error in messageService', () => {
    const errMsg = 'simulated network error';

    heroService.getHeroes().subscribe(data => {
      expect(msgServiceSpy.add).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne('api/heroes');
    req.flush(errMsg, { status: 404, statusText: 'Not Found' });
  });

  it('should return empty hero result on error', () => {
    const errMsg = 'simulated network error';

    heroService.getHeroes().subscribe(data => {
      expect(data.length).toEqual(0);
    });

    const req = httpTestingController.expectOne('api/heroes');
    req.flush(errMsg, { status: 404, statusText: 'Not Found' });
  });

  it('should add hero', () => {
    heroService.deleteHero({ id: 1, name: 'Busta Rhymes'}).subscribe();
    const req = httpTestingController.expectOne('api/heroes/1');
    // Expect one request with an authorization header
    expect(req.request.method).toEqual('DELETE');
  });

  it('should set content-type header on adding hero', () => {
    heroService.deleteHero({ id: 1, name: 'Busta Rhymes' }).subscribe();
    const req = httpTestingController.expectOne('api/heroes/1');
    // Expect one request with an authorization header
    expect(req.request.headers.has('Content-Type')).toBeTruthy();
  });

  it('should delete hero', () => {
    heroService.addHero({ id: 1, name: 'Busta Rhymes' }).subscribe();
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');
  });

  it('should update hero', () => {
    heroService.updateHero({ id: 1, name: 'Busta Rhymes' }).subscribe();
    const req = httpTestingController.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');
  });

  it('should return empty array for empty search term', () => {
    heroService.searchHeroes(" ").subscribe(data => {
      expect(data.length).toEqual(0);
    });
  });


  it('should return empty array for empty search term', () => {
    const mockTerm = 'test';
    heroService.searchHeroes(mockTerm).subscribe();
    const req = httpTestingController.expectOne(`api/heroes/?name=${mockTerm}`);
    expect(req.request.method).toEqual('GET');
  });
});
