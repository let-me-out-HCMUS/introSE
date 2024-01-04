import { axiosClient } from "./axiosClient";

export const getAllMatches = async () => {
  const response = await axiosClient.get("/matches?limit=1000");
  return response;
};

export const get5NearestMatches = async () => {
  const response = await axiosClient.get(
    "/matches?sort=time&limit=5&fromNow=true",
  );
  return response;
};

export const createMatch = async (match) => {
  const response = await axiosClient.post("/matches", match);

  return response;
};
