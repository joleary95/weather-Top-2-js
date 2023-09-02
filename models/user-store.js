import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("users");

export const userStore = {
  async getAllUsers() {
    await db.read();
    return db.data.users;
  },

  async addUser(user) {
    await db.read();
    user._id = v4();
    db.data.users.push(user);
    await db.write();
    return user;
  },

  async updateUser(updatedUser) {
    await db.read();
    const emailInUse = db.data.users.some((user) => user.email === updatedUser.email);
    const index = db.data.users.findIndex((user) => user.email === emailInUse.email);

    if (index !== -1) {
      db.data.users[index] = updatedUser;
      await db.write();
      console.log("User updated successfully:", updatedUser); // print user
      return updatedUser;
    } else {
      console.log("User not found for update.");
      return null; //If stattement to determine if updateuser is working
    }
  },

  async getUserById(id) {
    await db.read();
    return db.data.users.find((user) => user._id === id);
  },

  async getUserByEmail(email) {
    await db.read();
    return db.data.users.find((user) => user.email === email);
  },

  async deleteUserById(id) {
    await db.read();
    const index = db.data.users.findIndex((user) => user._id === id);
    db.data.users.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.users = [];
    await db.write();
  },
};
