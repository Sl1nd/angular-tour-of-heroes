import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let heroServiceSpy: jasmine.SpyObj<HeroService>;

  beforeEach(async(() => {
    const testData: Hero[] = [{
      id: 1,
      name: 'Achilis'
    }, {
        id: 2,
        name: 'Hector'
      }];

    // Create a fake HeroService object with a `getHeroes()` spy
    const spy = jasmine.createSpyObj('HeroService', ['getHeroes']);
    // Make the spy return a synchronous Observable with the test data
    const getHeroesSpy = spy.getHeroes.and.returnValue(of(testData));

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent
       ],
      providers: [{ provide: HeroService, useValue: spy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    heroServiceSpy = TestBed.get(HeroService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
