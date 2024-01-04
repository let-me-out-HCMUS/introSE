import axiosClient from "./axiosClient";

export const getAllMatches = async () => {
    const response = await axiosClient.get('/matches?limit=1000');
    return response;
};

export const get5NearestMatches = async () => {
    
}

export const createMatch = async (match) => {   
    const response = await axiosClient.post('/matches', match);

    return response;
};