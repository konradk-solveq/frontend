import {axiosGet} from './api';

export const getConfig = async () => await axiosGet('/application/config');
