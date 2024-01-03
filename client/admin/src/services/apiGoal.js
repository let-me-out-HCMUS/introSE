import axiosClient  from './axiosClient';

export const getGoalsMatch = async (id) => {
    const res = await axiosClient.get(`/goals?match=${id}`);
    return res.data.goals;
}