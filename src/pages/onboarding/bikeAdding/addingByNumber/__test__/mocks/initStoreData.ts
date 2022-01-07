const initStoreData = {
    auth: {userAuthState: 'loggedout'},
    app: {
        showedLocationInfo: false,
        internetConnectionInfo: {goodConnectionQuality: true},
    },
    user: {onboardingFinished: true, userName: '', frameNumber: '123456789'},
    routes: {currentRoute: {isActive: false}},
};

export default initStoreData;
