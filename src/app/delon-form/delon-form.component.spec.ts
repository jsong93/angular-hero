import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelonFormComponent } from './delon-form.component';

describe('DelonFormComponent', () => {
  let component: DelonFormComponent;
  let fixture: ComponentFixture<DelonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
