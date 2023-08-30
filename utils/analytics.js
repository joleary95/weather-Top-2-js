import { readingList } from "../models/reading-list.js";
import { stationList } from "../models/station-list.js";
import { conversions } from "../utils/conversions.js";

export const analytics = {
  async updateWeather(stationId) {
    const latestReading = await readingList.getLatestReadingByStationId(stationId);
    const readings = await readingList.getReadingsByStationId(stationId);
    if (latestReading) {
      const tempC = latestReading.temp;
      const tempF = await conversions.celsiusToFahrenheit(tempC);
      const pressure = latestReading.pressure;
      const windSpeedBft = await conversions.windSpeedToBft(latestReading.windspeed);
      const weatherDescription = await conversions.codeToWeatherDescription(latestReading.code);
      const windDirection = await conversions.windDirection(latestReading.winddirection);
      const windChill = await conversions.windChill(tempC, windSpeedBft);
      const minTemp = await conversions.findMinTemp(readings);
      const maxTemp = await conversions.findMaxTemp(readings);
      const minWindSpeed = await conversions.findMinWindSpeed(readings);
      const maxWindSpeed = await conversions.findMaxWindSpeed(readings);
      const minPressure = await conversions.findMinPressure(readings);
      const maxPressure = await conversions.findMaxPressure(readings);
      return {
        tempC: tempC,
        tempF: tempF,
        pressure: pressure,
        windSpeedBft: windSpeedBft,
        weatherDescription: weatherDescription,
        windDirection: windDirection,
        windChill: windChill,
        minTemp: minTemp,
        maxTemp: maxTemp,
        minWindSpeed: minWindSpeed,
        maxWindSpeed: maxWindSpeed,
        minPressure: minPressure,
        maxPressure: maxPressure,
      };
    }
    return null;
  },
};
