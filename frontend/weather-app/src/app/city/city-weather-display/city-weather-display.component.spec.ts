import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityWeatherDisplayComponent } from './city-weather-display.component';

describe('CityWeatherDisplayComponent', () => {
  let component: CityWeatherDisplayComponent;
  let fixture: ComponentFixture<CityWeatherDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityWeatherDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityWeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
