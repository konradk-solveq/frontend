import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}

const getData = async (key: string, value: string = '') => {
    try {
        const val = await AsyncStorage.getItem(key)
        if (val != null) {
            return val;
        }
    } catch (e) {
        storeData(key, value);
        return value;
    }
}

const storeJsonData = async (key: string, value: string) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

const getJsonData = async (key: string, value: string = '{}') => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        if (jsonValue != null) {
            return JSON.parse(jsonValue)
        } else {
            storeJsonData(key, value);
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

const getStorageUserName = async () => await getData('user_name');
const setStorageUserName = async (name: string) => await storeData('user_name', name);

const getStorageFrameNumber = async () => await getData('frame_number');
const setStorageFrameNumber = async (num: string) => await storeData('frame_number', num);

const getStorageBikeData = async (settings: any = '{}') => await getJsonData('bike_data', settings);
const setStorageBikeData = async (settings: any) => await storeJsonData('bike_data', settings);

const getStorageProfileSettings = async (settings: any = '{}') => await getJsonData('profile_settings', settings);
const setStorageProfileSettings = async (settings: any) => await storeJsonData('profile_settings', settings);

export {
    getStorageUserName, setStorageUserName,
    getStorageFrameNumber, setStorageFrameNumber,
    getStorageBikeData, setStorageBikeData,
    getStorageProfileSettings, setStorageProfileSettings
}


