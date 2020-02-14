# WeatherDashboard
A weather dashboard that display live weather updates streaming from https://openweathermap.org/api

## Introduction
This is a weather dashboard application with search functionality to find current weather conditions and the future weather outlook for multiple cities. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery. AJAX is also present in the code to hook into the API to retrieve data in JSON format.

As a traveler, I want to see the weather outlook for multiple cities so that I can plan a trip accordingly

![weather dashboard](./Assets/Weather-Dashboard-Demo.png)

## Usage
* I am using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.

* The program uses AJAX to hook into the API to retrieve data in JSON format to display the following under current weather conditions:

  * City

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity

  * Wind speed

  * UV index

* A 5-Day Forecast below the current weather conditions is also included in the program. Each day for the 5-Day Forecast displays the following:

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity

* A search history so that users can access their past search terms is also included. Clicking on the city name would return current and future conditions for that city. 