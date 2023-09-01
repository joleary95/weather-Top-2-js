import { stationList } from "../models/station-list.js";
import { accountsController } from "./accounts-controller.js";
import { analytics } from "../utils/analytics.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationList.getStationsByUserId(loggedInUser._id);
    const sortedStations = stations.slice().sort((a, b) => a.title.localeCompare(b.title));
    const latestWeatherDashboard = await Promise.all(stations.map((station) => analytics.updateWeather(station._id)));

    const viewData = {
      title: "Weather Top Dashboard",
      stations: sortedStations,
      latestWeatherDashboard: latestWeatherDashboard,
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

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationList.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
