import { axiosClient } from "./axiosClient";

export const getMatches = async () => {
  const res = await axiosClient.get("/matches/");
  return res.data;
};

export const getMatchById = async (id) => {
    const res = await axiosClient.get(`/matches/${id}`);
    return res.data.match;
}

export const getMatchUp = async (id1, id2) => {
    const res = await axiosClient.get(`/matches?firstClub=${id1}&secondClub=${id2}`);
    return res.data;
}
