/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getAllProducts = (data: any) => {
  return axios
    .get("http://localhost:3000/product", { params: data })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Trả về một giá trị mặc định nếu có lỗi
      return [];
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneProducts = (id: any) => {
  return axios.get(`http://localhost:3000/product/${id}`).then((response) => {
    return response.data;
  });
};

export const deleteProducts = (id: number) => {
  return axios
    .delete(`http://localhost:3000/product/${id}`)
    .then((response) => {
      // console.log(response;
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const apiPostProducts = (data: any) => {
  return axios.post("http://localhost:3000/product", data).then((response) => {
    return response;
  });
};

export const apiPostOneProducts = (data: any) => {
  return axios
    .put(`http://localhost:3000/product/${data.id}`, data)
    .then((response) => {
      return response;
    });
};

export const apiPostOrderProducts = (id: any, data: any) => {
  return axios
    .put(`http://localhost:3000/product/${id}`, data)
    .then((response) => {
      return response;
    });
};

export const apiPutOrder = (data: any) => {
  return axios
    .post("http://localhost:3000/order", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Trả về một giá trị mặc định nếu có lỗi
      return [];
    });
};
