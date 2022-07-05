import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {RegularStackRoute, BothStackRoute} from '@navigation/route';
import {getIsNewVersion} from '@helpers/appVersion';
import {
    setAppNotificationDate,
    setAppNotifications,
} from '@storage/actions/app';
import {notificationDataSelector} from '@storage/selectors/app';
import {PrimaryButton} from '@components/buttons';
import {getFVerticalPx} from '@helpers/appLayoutDimensions';
import GenericScreen from '@pages/template/GenericScreen';
import {appContainerHorizontalMargin} from '@theme/commonStyle';
import {NotificationMessage} from '@components/documents';

interface Props {
    navigation: any;
    route: any;
}

const Notifications: React.FC<Props> = (props: Props) => {
    const {t} = useMergedTranslation('notifications');
    const dispatch = useAppDispatch();
    const notifications = useAppSelector(notificationDataSelector);

    const shopAppVersion = useAppSelector<string>(
        state => state.app.config.version,
    );
    const showedNewAppVersion = useAppSelector<string>(
        state => state.app.showedNewAppVersion,
    );
    const [showNewAppVersion, setShowNewAppVersion] = useState<boolean>(false);

    useEffect(() => {
        // show New App Version
        if (
            showedNewAppVersion < shopAppVersion &&
            getIsNewVersion(shopAppVersion)
        ) {
            setShowNewAppVersion(true);
        }
    }, [shopAppVersion, showedNewAppVersion]);

    const handleGoForward = () => {
        dispatch(setAppNotificationDate(new Date()));
        dispatch(setAppNotifications([]));
        const getPage = () => {
            if (showNewAppVersion) {
                return RegularStackRoute.NEW_APP_VERSION_SCREEN;
            }

            return BothStackRoute.TAB_MENU_SCREEN;
        };

        props.navigation.navigate(getPage());
    };

    return (
        <GenericScreen noHeader>
            <View style={styles.scrollContainer}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.wrap}>
                        {notifications.map(notification => (
                            <NotificationMessage
                                message={notification.content}
                                key={notification.content.id}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.button}>
                <PrimaryButton text={t('button')} onPress={handleGoForward} />
            </View>
        </GenericScreen>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    scroll: {
        width: '100%',
    },
    wrap: {
        flex: 1,
        marginHorizontal: appContainerHorizontalMargin,
    },
    button: {
        marginBottom: getFVerticalPx(16),
    },
});
