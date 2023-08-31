import { stationList } from "../models/station-list.js";
import { accountsController } from "./accounts-controller.js";
import { analytics } from "../utils/analytics.js";
export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationList.getStationsByUserId(loggedInUser._id);

    const latestWeatherData = [];

    for (const station of stations) {
      const latestWeather = await analytics.updateWeather(station._id);
      latestWeatherData.push(latestWeather);
    }

    const viewData = {
      title: "Weather Top Dashboard",
      stations: stations,
      latestWeatherData: latestWeatherData,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      userid: loggedInUser._id,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };
    console.log(`adding station ${newStation.title}`);
    await stationList.addStation(newStation);
    response.redirect("/dashboard");
  },
};
