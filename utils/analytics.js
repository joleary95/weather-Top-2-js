import { readingList } from "../models/reading-list.js";
import { stationList } from "../models/station-list.js";
import { conversions } from "../utils/conversions.js";

export const analytics = {
  async updateWeather(stationId) {
    const latestReading = await readingList.getLatestReadingByStationId(stationId);
    const readings = await readingList.getReadingsByStationId(stationId);
    const stations = await stationList.getStationById(stationId);
    const longitude = stations.longitude;
    const latitude = stations.latitude;
    const title = stations.title;
    if (latestReading) {
      const tempC = latestReading.temp;
      const tempF = await conversions.celsiusToFahrenheit(tempC);
      const minTemp = await conversions.findMinTemp(readings);
      const maxTemp = await conversions.findMaxTemp(readings);
      const tempTrend = await this.tempTrend(readings);
      console.log(tempTrend);
      const pressure = latestReading.pressure;
      const windSpeedBft = await conversions.windSpeedToBft(latestReading.windspeed);
      const weatherDescription = await conversions.codeToWeatherDescription(latestReading.code);
      const windDirection = await conversions.windDirection(latestReading.winddirection);
      const windChill = await conversions.windChill(tempC, windSpeedBft);
      const minWindSpeed = await conversions.findMinWindSpeed(readings);
      const maxWindSpeed = await conversions.findMaxWindSpeed(readings);
      const minPressure = await conversions.findMinPressure(readings);
      const maxPressure = await conversions.findMaxPressure(readings);
      return {
        tempC: tempC,
        tempF: tempF,
        tempTrend: tempTrend,
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
        longitude: longitude,
        latitude: latitude,
        title: title,
      };
    }
    return null;
  },

  async tempTrend(readings) {
    let trend = 0;
    if (readings.length > 2) {
      const values = [
        readings[readings.length - 3].temp,
        readings[readings.length - 2].temp,
        readings[readings.length - 1].temp,
      ];
      trend = await this.calcTrend(values);
      console.log("trend check:" + trend); // check to be sure the readings calculate correctly
    }
    return trend;
  },

  async calcTrend(values) {
    let trend = 0;
    if (values.length > 2) {
      if (values[2] > values[1] && values[1] > values[0]) {
        trend = 1;
      } else if (values[2] < values[1] && values[1] < values[0]) {
        trend = -1;
      }
    }
    return trend;
  },
};
