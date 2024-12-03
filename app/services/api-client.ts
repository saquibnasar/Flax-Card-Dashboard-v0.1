import axios from "axios";
import { setCookie } from "cookies-next";
import { CardDetails } from "../dashboard/CardGrid";
import { LeadForm } from "../utils/entities/LeadForm";

const http = axios.create({
  baseURL: "https://dashboard.flaxcard.com",
});

export const getAllMembers = async () => {
  const data = await http
    .get<CardDetails[]>("/members/all")
    .then((response) => response.data);
  return data;
};

export const isUrlUnique = async (profileUrl: string) =>
  await axios.post(`https://dashboard.flaxcard.com/profile/checkProfile`, {
    profileUrl,
  });

export const updateMember = async <T>(data: FormData) =>
  await http
    .post<T>("/members/updateMember", data)
    .then((response) => response.data);

export const deleteAdditionalLinks = async (employeeId: string, type: string) =>
  await http.delete("/members/deleteAdditionalLink", {
    data: { employeeId, type },
  });

export const checkPrimaryCard = async (accessToken: string) => {
  const data = await http
    .get<{ isCardCreated: boolean }>("/members/isCardCreated")
    .then((response) => response.data);
  return data.isCardCreated;
};

export const checkMemberProfile = async (profileUrl: string) => {
  const data = await http
    .post<{ memberExist: boolean }>("/members/checkMemberProfile", {
      profileUrl,
    })
    .then((response) => response.data);
  return data.memberExist;
};

export const checkEmployeeId = async (employeeId: string) => {
  const data = await http
    .post<{ employeeExist: boolean }>("/members/checkEmployeeId", {
      employeeId,
    })
    .then((response) => response.data);
  return data.employeeExist;
};

export const addLeadForm = async (form: LeadForm) => {
  const data = await http
    .post("/profile/addFormData", form)
    .then((response) => response);
  return data;
};

export const tokenState = async (
  memberId: string,
  serialNumber: string,
  active: boolean
) => {
  const { data } = await http.post("/members/toggleTokenState", {
    memberId,
    nfcUrl: `https://flaxcard.one/nfc/${serialNumber}`,
    active,
  });

  return data;
};

export const getMemberCredits = async (token: string) => {
  const { data } = await axios
    .get<{ credits: number }>(
      `https://dashboard.flaxcard.com/members/getMemberCredits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response);

  return data.credits;
};

http.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.status == 401) {
      http
        .post("/auth/refresh-token", {
          accessToken: window.localStorage.getItem("accessToken"),
          refreshToken: window.localStorage.getItem("refreshToken"),
        })
        .then(async (res) => {
          setCookie("accessToken", res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          return await axios.request(error.config);
        })
        .catch((err) => {
          window.location.href = "/login";
        });
    }
    return Promise.reject(error);
  }
);

export default http;
