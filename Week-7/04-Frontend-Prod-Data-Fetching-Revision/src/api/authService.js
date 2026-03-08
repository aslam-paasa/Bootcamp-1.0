/**
 * Part-2: Authentication calls using Axios Instance
 * 1. Problem: Har component me ye likhna
 *    > axios.post("/auth/login", ...)
 *    > axios.post("/auth/register", ...)
 * 
 * 2. Solution:
 *    > Auth se related saari API calls ek hi jagha
 *    > Is jagha ka naam: authService
 * 
 * 3. What is authService?
 * 
 *    const authService = {
 *      register: async () => {},
 *      login: async () => {},
 *      logout: async () => {},
 *      getCurrentUser: async () => {}
 *    };
 * 
 *    > authService ek object (central place) hai jaha authentication se 
 *      related saare API logic hoti hai, taaki components simple rahe.
 *    > Jaise:
 *      - register
 *      - login
 *      - logout
 *      - current user fetch
*/

import axiosInstance from "./axios";
import { StorageKeys } from "../utils/constants.js";

const authService = {
  /**
   * 1. register function:
   *    > Component userData bhejta hai
   *    > /auth/register backend API call hoti hai
   *    > Backend response deta hai
   *    > response.data component ko mil jaata hai
  */
  register: async (userdata) => {
    const response = await axiosInstance.post("/auth/register", userdata);
    return response.data;
  },

  /**
   * 2. login function:
   *    > Email + Password backend ko bhejte ho
   *    > Backend verify karta hai
   *    > Tokens save karta hai
   *      - Agar backend ne access token diya
   *      - Usko localStorage me save karo do
   *      - Fir ye token next request me automatically attach hoga
   *    > Component ko final data mil jaata hai
  */
  login: async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);

    if (response.data?.data?.accessToken) {
      localStorage.setItem(
        StorageKeys.ACCESS_TOKEN,
        response.data.data.accessToken
      );
    }

    if (response.data?.data?.refreshToken) {
      localStorage.setItem(
        StorageKeys.REFRESH_TOKEN,
        response.data.data.refreshToken
      );
    }

    return response.data;
  },

  /**
   * 3. logout function:
   *    > Backend ko bolo: "logout karao"
   *    > LocalStorage se tokens hatao
   *    > User logged out
  */
  logout: async () => {
    const response = await axiosInstance.get("/auth/logout");
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    return response.data;
  },

  /**
   * 4. getCurrentUser function:
   *    > Logged-in user ka data laana
   *    > Profile page, navbar, etc ke liye
   *    > Access token already header me laga hota hai
  */
  getCurrentUser: async (userdata) => {
    const response = await axiosInstance.post("/auth/current-user", userdata);
    return response.data;
  },
};

export default authService;
