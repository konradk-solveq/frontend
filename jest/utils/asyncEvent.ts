import {act} from '@testing-library/react-native';

const asyncEvent = async (event: any) => {
    await act(async () => {
        await event;
    });
};

export default asyncEvent;
