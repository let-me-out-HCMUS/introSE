import { axiosClientFormData, axiosClient } from "./axiosClient";
import { createPlayer } from "./apiPlayers";

export const createClub = async (clubName, stadium, file, players) => {
  const formData = new FormData();

  if (!file) {
    throw new Error("File is undefined");
  }

  // prepare body data
  formData.append("file", file);
  formData.append("clubName", clubName);
  formData.append("stadium", stadium);

  await axiosClientFormData.post("/clubs", formData);

  const promiseArray = players.map(async (player) => {
    createPlayer(player, clubName);
  });

  await Promise.all(promiseArray);
};

export const getClubs = async () => {
  const response = await axiosClient.get("/clubs");

  return response.data;
};

export const getClubsForRanking = async () => {
  const response = await axiosClient.get("/clubs/ranking");

  return response.data;
};

export const getClubById = async (id) => {
  const response = await axiosClient.get(`/clubs/${id}`);

  return response.data;
};

export const updateClub = async ({ id, clubName, stadium }) => {
  const res = await axiosClient.patch(`/clubs/${id}`, { clubName, stadium });

  return res.data;
};
