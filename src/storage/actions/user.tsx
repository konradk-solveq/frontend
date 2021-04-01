import * as actionTypes from './actionTypes';
import {
    getStorageUserName, setStorageUserName,
    getStorageFrameNumber, setStorageFrameNumber,
    getStorageProfileSettings, setStorageProfileSettings
} from '../localStorage';
import { AsyncStorage } from "react-native-async-storage/async-storage";


// imię/nick uzytkownika
export const getUserName = async () => {
    let name = await getStorageUserName()
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

// numer ramy kross
export const getFrameNumber = async () => {
    let num = await getStorageFrameNumber()
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

// nazwa profilu użytkonika na podstawie settingsów pofilu
export const getProfileSettings = async (data: any) => {
    let settings = await getStorageProfileSettings(data)
    return {
        type: actionTypes.GET_PROFILE_SETTINGS,
        profileData: settings
    }
};

export const setProfileSettings = (data: any) => {
    setStorageProfileSettings(data);
    return {
        type: actionTypes.SET_PROFILE_SETTINGS,
        profileData: data
    }
};


// var axios = require('axios');

// var config = {
//     method: 'get',
//     url: 'https://api-kross.adafir.eu/api/product-offers/identifiers/erp_id?filter=%7B%22identifiers%22%3A%5B%22KRERTE29X16M003392%22%5D%7D',
//     headers: {
//         'Accept': 'application/vnd.enp.api+json;version=v1',
//         'Content-Website': '4',
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer N2ViYWI4OTY1OWU5YWYyY2U0NjhmM2U1OTg3MWFhYmMwMjFlYmM0YzZhNWVmMjliMTJjOWQwZWY2ZjQ1MjRiNQ'
//     }
// };

// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
