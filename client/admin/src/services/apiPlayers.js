import axiosClient  from './axiosClient';

export const getPlayersClub = async (id) => {
    const res = await axiosClient.get(`/players?club=${id}`);
    return res.data.players;
}