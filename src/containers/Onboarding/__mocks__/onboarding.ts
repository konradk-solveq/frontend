export const tiles = [
    {
        title: 'Record routes',
        description: 'A quick and easy way to start recording your bike routes',
        imgSource: require('@pages/onboarding/tutorial/images/recordRoutes.png'),
    },
    {
        title: 'Public Routes',
        description:
            'Take example from others and upload your routes to public map',
        imgSource: require('@pages/onboarding/tutorial/images/publicRoutes.png'),
    },
    {
        title: 'Bike',
        description: "Add it to your app and you'll get more details",
        imgSource: require('@pages/onboarding/tutorial/images/bikes.png'),
    },
    {
        title: 'Services and stores',
        description: 'Find a KROSS recommended bike specialist',
        imgSource: require('@pages/onboarding/tutorial/images/services.png'),
    },
];

export const language = {
    name: 'Polski',
    code: 'pl',
};

export const icon =
    '<svg width="32mm" height="32mm" viewBox="0 0 32 32"><circle cx="16" cy="16" fill="#f6f6f6" r="16"/><path d="M.008 15.77A16 16 0 0 0 0 16a16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-.004-.23z" fill="red"/></svg>';

export const locationUsage = {
    buttonText: 'Next',
    info: 'Select Allow while using the application on the next screen.',
    header: 'We need your permission to allow GPS track recording',
    image: require('@pages/onboarding/locationUsageInfo/images/routeMap.png'),
};
