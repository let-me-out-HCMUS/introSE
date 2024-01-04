import { axiosClient, axiosClientFormData } from "./axiosClient";

export const createPlayer = async (player, clubName) => {
  const formData = new FormData();

  if (!player.image) {
    throw new Error("File is undefined");
  }

  // prepare body data
  formData.append("clubName", clubName);
  formData.append("file", player.image);
  formData.append("name", player.name);
  formData.append("shirtNum", player.shirtNum);
  formData.append("type", player.type);
  formData.append("dob", player.dob);
  formData.append("note", player.note);

  const res = await axiosClientFormData.post("/players", formData);

  return res;
};

export const getPlayersByClubId = async (clubId) => {
  const res = await axiosClient.get(`/players?club=${clubId}`);
  return res.data.players;
};

export const getPlayerByPlayerId = async (playerId) => {
  const res = await axiosClient.get(`/players/${playerId}`);
  return res.data;
};

export const getAllPlayers = async () => {
  const res = await axiosClient.get(`/players`);
  return res.data.players;
};

export const getPlayersWithConditionalChecking = async (clubId) => {
  if (clubId) {
    return await getPlayersByClubId(clubId);
  } else {
    return await getAllPlayers();
  }
};
