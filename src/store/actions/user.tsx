import * as actionTypes from './actionTypes';
import { getStorageUserName, setStorageUserName } from '../storage';
import { AsyncStorage } from "react-native-async-storage/async-storage";



export const getUserName = async () => {
    let name = await getStorageUserName()
    console.log('%c name():', name)
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