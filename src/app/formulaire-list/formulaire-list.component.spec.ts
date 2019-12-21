import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireListComponent } from './formulaire-list.component';

describe('FormulaireListComponent', () => {
  let component: FormulaireListComponent;
  let fixture: ComponentFixture<FormulaireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
