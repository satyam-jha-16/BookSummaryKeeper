import { conf } from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
import { logout } from "../features/authSlice.js";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //another method -- login on creation of account
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("error creating account",  error);
    }
  }
  async login(email, password) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("error logging in",  error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("error getting current user", error);
    }

    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("logout error : ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
