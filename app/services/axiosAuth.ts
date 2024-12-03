import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

const axiosAuth = axios.create({
  baseURL: "https://dashboard.flaxcard.com",
});

axiosAuth.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken", { cookies });
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosAuth.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         try {
//           const response = await axiosAuth.post("/auth/refresh-token", {
//             refreshToken,
//           });

//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem("accessToken", newAccessToken);

//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axiosAuth(originalRequest);
//         } catch (refreshError) {
//           window.location.href = "/login";
//           return Promise.reject(refreshError);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );
export default axiosAuth;
