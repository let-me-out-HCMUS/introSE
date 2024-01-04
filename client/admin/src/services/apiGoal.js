import { axiosClient } from "./axiosClient";

export const getGoalsMatch = async (id) => {
  const res = await axiosClient.get(`/goals?match=${id}`);
  return res.data.goals;
};

export const updateGoal = async (id, data) => {
  // console.log('data',data);
  const res = await axiosClient.patch(`/goals/${id}`, data);
  return res.data.goal;
};

export const addGoal = async (data) => {
  const res = await axiosClient.post(`/goals`, data);
  console.log("res", res.data.goal);

  return res.data.goal;
};

export const deleteGoal = async (id) => {
  console.log("id", id);
  const res = await axiosClient.delete(`/goals/${id}`);
  return res.data;
};
