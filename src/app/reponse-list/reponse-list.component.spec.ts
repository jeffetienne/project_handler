import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseListComponent } from './reponse-list.component';

describe('ReponseListComponent', () => {
  let component: ReponseListComponent;
  let fixture: ComponentFixture<ReponseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReponseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
