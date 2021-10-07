import GetLocation from 'react-native-get-location';

GetLocation.getCurrentPosition = jest.fn().mockImplementation(() =>
    Promise.resolve({
        latitude: 50.691728031513534,
        longitude: 17.79613619421019,
        altitude: -1,
        accuracy: 1,
        speed: 2.78,
        time: '2021-07-27T12:06:38.741Z',
        bearing: '',
        provider: '',
        verticalAccuracy: '',
        course: 330.55,
    }),
);

export default GetLocation;
