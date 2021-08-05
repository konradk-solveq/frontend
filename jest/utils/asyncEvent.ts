import {act} from '@testing-library/react-native';

const asyncEvent = async (event: any) => {
    let result: undefined | any;
    await act(async () => {
        result = await event;
    });

    return result;
};

export default asyncEvent;
