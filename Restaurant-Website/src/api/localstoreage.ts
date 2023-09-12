/* eslint-disable @typescript-eslint/no-explicit-any */
const localstoreage = () => {
  const loginData: any = localStorage.getItem("Auth");
  const getData = JSON.parse(loginData) || "";
  return getData;
};

export default localstoreage;
