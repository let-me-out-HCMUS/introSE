import axiosClient  from './axiosClient';
import { axiosClientFormData } from './axiosClient';

export const createPlayer = async (player, clubName) => {
    const formData = new FormData();

    if (!player.image) {
        throw new Error('File is undefined');
    }

    // prepare body data
    formData.append('clubName', clubName);
    formData.append('file', player.image);
    formData.append('name', player.name);
    formData.append('shirtNum', player.shirtNum);
    formData.append('type', player.type);
    formData.append('dob', player.dob);
    formData.append('note', player.note);

    const res = await axiosClientFormData.post('/players', formData);

    return res;
}

export const getPlayersClub = async (id) => {
    const res = await axiosClient.get(`/players?club=${id}`);
    return res.data.players;