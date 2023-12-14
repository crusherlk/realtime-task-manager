import axios from "axios";
import { SETTINGS } from "../config/common";

export const currentUser = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo;
};

export const logOut = () => {
  localStorage.removeItem("userInfo");
};

export const registerUser = async (payload) => {
  try {
    const res = await axios.post(`${SETTINGS.BASE_API}/user/register`, payload);
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (payload) => {
  try {
    const res = await axios.post(`${SETTINGS.BASE_API}/user/login`, payload);
    localStorage.setItem("userInfo", JSON.stringify(res.data));

    return res.data;
  } catch (err) {
    // toast({
    //   title: err.message,
    //   status: "error",
    //   position: "top-right",
    //   duration: 3000,
    //   isClosable: true,
    // });
    console.log(err);
  }
};
