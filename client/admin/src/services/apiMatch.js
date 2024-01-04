import { axiosClient } from "./axiosClient";

export const getMatches = async () => {
  const res = await axiosClient.get("/matches/");
  return res.data;
};

export const getMatchById = async (id) => {
  const res = await axiosClient.get(`/matches/${id}`);
  return res.data.match;
};
