import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  forecasts = signal<WeatherForecast[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.forecasts.set([]);

    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        this.forecasts.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching weather data', error);
        this.errorMessage.set('Failed to retrieve weather forecasts. The service might be temporarily unavailable.');
        this.isLoading.set(false);
      },
    });
  }
}
