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

  async updateUser(updatedUser, currentEmail) {
    await db.read();
    /* getting current index for current user - using the email stored in the database. 
    !!! use of current and not updatedemail very important here as we have not wrote to db yet!!!
    */
    const index = db.data.users.findIndex((user) => user.email === currentEmail);

    /* checking if found the correct index - 
    update current user details with updatedUser fields.
    return index if found to update cookie.
    */
    if (index !== -1) {
      db.data.users[index].firstName = updatedUser.firstName;
      db.data.users[index].lastName = updatedUser.lastName;
      db.data.users[index].email = updatedUser.email;
      db.data.users[index].password = updatedUser.password;

      await db.write();
      console.log("User updated successfully:", db.data.users[index]);
      return db.data.users[index];
    } else {
      console.log("User not found for update.");
      return null;
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
