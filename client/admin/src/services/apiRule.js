import { axiosClient } from "./axiosClient";

export const getRule = async () => {
  const res = await axiosClient.get("/rules/6592704d5198c1cc1900f17a");
  return res.data.rule;
};

export const updateRule = async (rule) => {
  const res = await axiosClient.put("/rules/6592704d5198c1cc1900f17a", rule);
  return res.data.rule;
};
