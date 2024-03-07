import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomapageComponent } from './homapage.component';

describe('HomapageComponent', () => {
  let component: HomapageComponent;
  let fixture: ComponentFixture<HomapageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomapageComponent]
    });
    fixture = TestBed.createComponent(HomapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
