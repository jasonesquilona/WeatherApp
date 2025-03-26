import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayWeatherPageComponent } from './today-weather-page.component';

describe('TodayWeatherPageComponent', () => {
  let component: TodayWeatherPageComponent;
  let fixture: ComponentFixture<TodayWeatherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayWeatherPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayWeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
