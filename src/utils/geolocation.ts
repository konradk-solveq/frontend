import BackgroundGeolocation from 'react-native-background-geolocation';

export const initBGeolocalization = () => {
    BackgroundGeolocation.ready({
        reset: true,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        locationAuthorizationAlert: {
            titleWhenNotEnabled: 'Location-services not enabled',
            titleWhenOff: 'Location-services OFF',
            instructions: "You must enable 'Always' in location-services",
            cancelButton: 'Cancel',
            settingsButton: 'Settings',
        },
        distanceFilter: 40,
        stopTimeout: 5,
        debug: false,
        logLevel: __DEV__
            ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
            : BackgroundGeolocation.LOG_LEVEL_ERROR,
        stopOnTerminate: false,
        startOnBoot: true,
    });
};
