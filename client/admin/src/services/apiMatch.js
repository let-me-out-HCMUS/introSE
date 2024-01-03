import axiosClient  from './axiosClient';

export const getMatches = async () => {
    const res = await axiosClient.get('/matches/');
    return res.data;
}

export const getMatchById = async (id) => {
    const res = await axiosClient.get(`/matches/${id}`);
    return res.data.match;
}

export const updateRule = async (rule) => {
    const res = await axiosClient.put('/rules/6592704d5198c1cc1900f17a', rule);
    return res.data;
}