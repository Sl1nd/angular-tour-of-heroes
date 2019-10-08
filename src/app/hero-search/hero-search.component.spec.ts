import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeroSearchComponent } from './hero-search.component';
import { Hero } from '../hero';
import { newEvent, RouterLinkDirectiveStub } from '../../testing';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let testHeroes: Hero[];
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let heroSearchComponent: HTMLElement;
  let inputField: HTMLInputElement;

  beforeEach(async(() => {
    testHeroes = [{
      id: 1, name: 'Busta Rhymes'
    }];

    heroServiceSpy = jasmine.createSpyObj('HeroService', ['searchHeroes']);
    heroServiceSpy.searchHeroes.and.returnValue(of(testHeroes));

    TestBed.configureTestingModule({
      declarations: [HeroSearchComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    heroSearchComponent = fixture.nativeElement;
    inputField = heroSearchComponent.querySelector('input');
    fixture.detectChanges();
  });

  it('Should search term', fakeAsync(() => {
    const spy = spyOn(component, 'search');
    inputField.value = 'foo';
    inputField.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    tick(600);
    const test = spy.calls.mostRecent();
    expect(spy).toHaveBeenCalledWith('foo');
  }));


  it('Should call hero service', fakeAsync(() => {
    inputField.value = 'bar';
    inputField.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    tick(600);
    const test = heroServiceSpy.searchHeroes.calls.mostRecent();
    expect(heroServiceSpy.searchHeroes).toHaveBeenCalledWith('bar');
  }));
});
