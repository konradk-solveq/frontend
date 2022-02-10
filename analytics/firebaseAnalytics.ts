import analytics from '@react-native-firebase/analytics';

export const sendAnalyticInfoAboutNewScreen = async (
    name: string,
    previousName?: string,
) => {
    if (previousName !== name) {
        await logScreenView(name);
    }
};

export const logScreenView = async (name: string) => {
    await analytics().logScreenView({
        screen_name: name,
        screen_class: name,
    });
};

export const disableAnalytics = async () => {
    await analytics().setAnalyticsCollectionEnabled(false);
};

export const enableAnalytics = async () => {
    await analytics().setAnalyticsCollectionEnabled(true);
};