import { readingList } from "../models/reading-list.js";
import { stationList } from "../models/station-list.js";
import { conversions } from "../utils/conversions.js";

export const analytics = {
  async updateWeather(stationId) {
    const latestReading = await readingList.getLatestReadingByStationId(stationId);
    if (latestReading) {
      const tempC = latestReading.temp;
      const tempF = await conversions.celsiusToFahrenheit(tempC);
      const pressure = latestReading.pressure;
      const windSpeedBft = await conversions.windSpeedToBft(latestReading.windspeed);
      const weatherDescription = await conversions.codeToWeatherDescription(latestReading.code);
      const windDirection = await conversions.windDirection(latestReading.winddirection);
      const windChill = await conversions.windChill(tempC, windSpeedBft);
      return {
        tempC: tempC,
        tempF: tempF,
        pressure: pressure,
        windSpeedBft: windSpeedBft,
        weatherDescription: weatherDescription,
        windDirection: windDirection,
        windChill: windChill,
      };
    }
    return null;
  },
};
