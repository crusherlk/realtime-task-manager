import axios from "axios";
import { SETTINGS } from "../config/common";

export const createTask = async (payload, user) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.post(`${SETTINGS.BASE_API}/tasks`, payload, config);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllTasks = async (user) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.get(`${SETTINGS.BASE_API}/tasks`, config);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (id, payload, user) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.put(
      `${SETTINGS.BASE_API}/tasks/${id}`,
      payload,
      config
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (id, user) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const res = await axios.delete(`${SETTINGS.BASE_API}/tasks/${id}`, config);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
