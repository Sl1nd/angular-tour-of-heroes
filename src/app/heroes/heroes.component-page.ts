import { ComponentFixture } from "@angular/core/testing";
import { HeroesComponent } from './heroes.component';

export class Page {
  fixture: ComponentFixture<HeroesComponent>;
  get buttons() { return this.queryAll<HTMLButtonElement>('button'); }
  get addBtn() { return this.buttons[0]; }
  get delBtn() { return this.buttons[1]; }
  get nameInput() { return this.query<HTMLInputElement>('input'); }
  get heroList() { return this.query<HTMLUListElement>('ul'); }

  constructor(fixture: ComponentFixture<HeroesComponent>) {
    this.fixture = fixture;
  }
  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
