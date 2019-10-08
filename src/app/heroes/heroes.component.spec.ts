import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesComponent } from './heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterLinkDirectiveStub } from 'src/testing';
import { HeroService } from '../hero.service';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { Page } from './heroes.component-page';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let cmpPage: Page;
  beforeEach(async(() => {
    const sampleHeroes: Hero[] = [{ id: 1, name: 'Bruce Banner' }, { id: 2, name: 'Bruce Wayne' }];
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['addHero', 'deleteHero', 'getHeroes']);
    heroServiceSpy.addHero.and.returnValue(of({ id: 3, name: 'dude' }));
    heroServiceSpy.getHeroes.and.returnValue(of(sampleHeroes));

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, RouterLinkDirectiveStub],
      providers: [{ provide: HeroService, useValue: heroServiceSpy }],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    cmpPage = new Page(fixture);
    fixture.detectChanges();
  });

  it('should display sample heroes', () => {
    const heroListLength = cmpPage.heroList.children.length;
    expect(heroListLength).toEqual(2);
  });

  it('#addButton', () => {
    const spy = spyOn(component, 'add');
    cmpPage.nameInput.value = 'dude';
    cmpPage.addBtn.click();
    expect(spy).toHaveBeenCalledWith('dude');
  });

  it('Should add hero to list', () => {
    cmpPage.nameInput.value = 'dude';
    cmpPage.addBtn.click();
    fixture.detectChanges();
    const heroListLength = cmpPage.heroList.children.length;
    expect(heroListLength).toEqual(3);
  });

  it('Should remove hero from list', () => {
    cmpPage.nameInput.value = 'dude';
    cmpPage.delBtn.click();
    fixture.detectChanges();
    const heroListLength = cmpPage.heroList.children.length;
    expect(heroListLength).toEqual(1);
  });
});
