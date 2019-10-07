import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {HeroService} from '../hero.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let locationSpy: jasmine.SpyObj<Location>;
  let testHero; Hero;

  beforeEach(async(() => {
    testHero = {
      id: 1, name: 'Busta Rhymes'
    };
    locationSpy = jasmine.createSpyObj('Location', ['back']);
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);

    heroServiceSpy.getHero.and.returnValue(of(testHero));
    heroServiceSpy.updateHero.and.returnValue(of(testHero));

    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      providers: [{
         provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: () => 1}}}
         },{ provide: Location, useValue: locationSpy
        }, { provide: HeroService, useValue: heroServiceSpy}],
      imports: [FormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render hero title', () => {
    const heroDetail: HTMLElement = fixture.nativeElement;
    expect(heroDetail.querySelector('h2').textContent).toContain('BUSTA RHYMES Details');
  });

  it('should render save button', () => {
    const heroDetail: HTMLElement = fixture.nativeElement;

    expect(heroDetail.querySelectorAll('button')[0].textContent).toEqual('Save');
  });

  it('should updatehero on clicking save button', () => {
    const heroDetail: HTMLElement = fixture.nativeElement;
    const saveButton = heroDetail.querySelectorAll('button')[0];
    saveButton.click();
    expect(heroServiceSpy.updateHero).toHaveBeenCalledWith(testHero);
  });

  it('should navigate back on updating Hero', () => {
    spyOn(component, 'goBack');
    const heroDetail: HTMLElement = fixture.nativeElement;
    const saveButton = heroDetail.querySelectorAll('button')[0];
    saveButton.click();

    expect(component.goBack).toHaveBeenCalled();
  });

  it('should call goBack on clicking back Button', () => {
    spyOn(component, 'goBack');
    const heroDetail: HTMLElement = fixture.nativeElement;
    const saveButton = heroDetail.querySelectorAll('button')[1];
    saveButton.click();

    expect(component.goBack).toHaveBeenCalled();
  });

  it('should render back button', () => {
    const heroDetail = fixture.nativeElement;
    expect(heroDetail.querySelectorAll('button')[1].textContent).toEqual('go back');
  });
});
