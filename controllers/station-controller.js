import { readingList } from "../models/reading-list.js";
import { stationList } from "../models/station-list.js";
import { analytics } from "../utils/Analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationList.getStationById(request.params.id);
    const latestWeather = await analytics.updateWeather(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
      latestWeather: latestWeather,
    };
    response.render("station-view", viewData);
  },

  async addReading(request, response) {
    const station = await stationList.getStationById(request.params.id);
    const newReading = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windspeed: Number(request.body.windspeed),
      pressure: Number(request.body.pressure),
      winddirection: Number(request.body.winddirection),
    };
    console.log(`adding reading ${newReading.code}`);
    await readingList.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
};
