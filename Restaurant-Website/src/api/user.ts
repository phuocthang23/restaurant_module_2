/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export const getAllUsers = (params: any) => {
  return axios
    .get("http://localhost:3000/users", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneUser = (id: any) => {
  return axios
    .get(`http://localhost:3000/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTocart = (data: any) => {
  return axios
    .put(`http://localhost:3000/users/${data.id}`, data)
    .then((response) => {
      return response;
    });
};

export const putOneUser = (data: any) => {
  return axios
    .put(`http://localhost:3000/users/${data.id}`, data)
    .then((response) => {
      return response;
    });
};
