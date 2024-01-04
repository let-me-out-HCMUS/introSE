import axiosClient from "./axiosClient";

export const getMatches = async () => {
    const response = await axiosClient.get('/matches');
    return response;
};

export const createMatch = async (match) => {
    const response = await axiosClient.post('/matches', match);

    return response;
};