import * as actionTypes from './actionTypes';
import {
    getStorageUserName, setStorageUserName,
    getStorageFrameNumber, setStorageFrameNumber
} from '../storage';
import { AsyncStorage } from "react-native-async-storage/async-storage";



export const getUserName = async () => {
    let name = await getStorageUserName()
    // console.log('name: ', name)
    return {
        type: actionTypes.GET_USER_NAME,
        userName: name
    }
};


export const setUserName = (name: string) => {
    setStorageUserName(name);
    return {
        type: actionTypes.SET_USER_NAME,
        userName: name
    }
};

export const getFrameNumber = async () => {
    let num = await getStorageFrameNumber()
    // console.log('frame: ', num)
    return {
        type: actionTypes.GET_USER_NAME,
        userName: num
    }
};


export const setFrameNumber = (num: string) => {
    setStorageFrameNumber(num);
    return {
        type: actionTypes.SET_USER_NAME,
        userName: num
    }
};