import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("station", user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    console.log("User email from cookie:", userEmail);
    const user = await userStore.getUserByEmail(userEmail);
    console.log("Logged-in user:", user);
    return user;
  },

  async getProfile(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    console.log("Logged-in user:", loggedInUser);
    const viewData = {
      title: "Profile",
      user: loggedInUser,
    };
    response.render("profile-view", viewData);
  },

  async updateProfile(request, response) {
    const updatedUserData = request.body;
    const loggedInUser = await accountsController.getLoggedInUser(request);

    // store current email to pass to update user to find correct index & to update the email within the cookie
    const currentEmail = loggedInUser.email;

    // Update current details with new details added via form request
    loggedInUser.firstName = updatedUserData.firstName;
    loggedInUser.lastName = updatedUserData.lastName;
    loggedInUser.email = updatedUserData.email;
    loggedInUser.password = updatedUserData.password;

    console.log("Updated User Data:", loggedInUser);

    // Update the user in the db
    const updatedUser = await userStore.updateUser(loggedInUser, currentEmail);

    if (updatedUser) {
      // Update the email in the cookie if new 'updatedUser' exists
      response.cookie("station", updatedUser.email);

      console.log("Updated User Data:", updatedUser);
    } else {
      console.log("User not found for update.");
    }
    response.redirect("/profile");
  },
};
