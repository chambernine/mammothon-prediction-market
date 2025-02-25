import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    token: localStorage.getItem("privy:token"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  () => {
    return Promise.reject(new Error("Something went wrong | Network Error"));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `HTTP Error: ${error.response.status}`,
        error.response.data
      );

      switch (error.response.status) {
        case 401:
          console.error("Unauthorized access - Redirecting to login...");
          break;
        case 403:
          console.error("Access denied.");
          break;
        case 404:
          console.error("Resource not found.");
          break;
        case 500:
          console.error("Server error - Please try again later.");
          break;
        default:
          console.error("An unexpected error occurred.");
      }
    } else if (error.request) {
      console.error("No response received from the server", error.request);
    } else {
      console.error("Error setting up the request", error.message);
    }

    return Promise.reject(new Error("Something went wrong | Network Error"));
  }
);

export default axiosInstance;
