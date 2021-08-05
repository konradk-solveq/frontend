import BackgroundGeolocation from 'react-native-background-geolocation-android';

BackgroundGeolocation.getCurrentPosition = jest.fn().mockImplementation(() =>
    Promise.resolve({
        activity: {confidence: 100, type: 'still'},
        battery: {is_charging: true, level: 1},
        coords: {
            accuracy: 1,
            altitude: -1,
            altitude_accuracy: -1,
            heading: 330.55,
            heading_accuracy: -1,
            latitude: 50.691728031513534,
            longitude: 17.79613619421019,
            speed: 2.78,
            speed_accuracy: -1,
        },
        extras: {route_id: ''},
        is_moving: false,
        mock: true,
        odometer: 3406.699951171875,
        timestamp: '2021-07-27T12:06:38.741Z',
        uuid: '1d14d48d-a92c-45fb-981b-b300c7ef7a4c',
    }),
);

export default BackgroundGeolocation;
