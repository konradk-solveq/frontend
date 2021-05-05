import axios from 'axios';
import {API_URL} from '@env';

const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    // validateStatus: () => {
    //     return true;
    // },
});

export const source = axios.CancelToken.source();
export const isCancel = (c: any) => axios.isCancel(c);

export default instance;
