import axios from './api';

export const getFiles = async () => {
    const res = await axios.get('/files');
    return res.data;
};

export const saveFile = async (file) => {
    const res = await axios.post('/files', file);
    return res.data;
};
