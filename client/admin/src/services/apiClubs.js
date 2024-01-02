import { axiosClientFormData } from './axiosClient';

export const createClub = async (clubName, file) => {
    const formData = new FormData();

    if (!file) {
        throw new Error('File is undefined');
    }

    // prepare body data
    formData.append('file', file);
    formData.append('clubName', clubName);

    const res = await axiosClientFormData.post('/clubs', formData);

    return res.data;
}