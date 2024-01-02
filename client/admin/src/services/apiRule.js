import axiosClient  from './axiosClient';

export const getRule = async () => {
    const res = await axiosClient.get('/rules');
    return res.data.rule;
}