import { AsyncStorage } from "react-native";



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
        if (val !== null) {
            return val;
        }
    } catch (e) {
        storeData(key, value);
        return value;
    }
}

const getStorageUserName = async () => await getData('user_name');
const setStorageUserName = async (name: string) => await storeData('user_name', name);


export {
    getStorageUserName, setStorageUserName
}


