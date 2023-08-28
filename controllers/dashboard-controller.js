import { stationList } from "../models/station-list.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Weather Top",
      stations: await stationList.getAllStations(),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };
    console.log(`adding station ${newStation.title}`);
    await stationList.addStation(newStation);
    response.redirect("/dashboard");
  },
};
