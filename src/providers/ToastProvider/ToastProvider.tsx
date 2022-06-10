import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {StyleSheet, View} from 'react-native';

import {getFVerticalPx} from '@theme/utils/appLayoutDimensions';
import {
    appContainerHorizontalMargin,
    navBarHeight,
    screenHeight,
} from '@theme/commonStyle';
import Toast from '../../components/notifications/Toast';
import {NotificationI} from '../../components/notifications/Notification';

const DEFAULT_VISIBILITY_TIME = 3000;

export interface ToastItem extends NotificationI {
    key: string;
    testID?: string;
    onPressDismiss?: boolean;
    onDismissAction?: () => void;
}

interface IToastProps {
    children?: React.ReactNode;
    visibilityTime?: number;
}

const initialState = {
    toastList: [],
    addToast: (toast: ToastItem) => {},
    removeToast: (toast: ToastItem) => {},
    removeAllToasts: () => {},
};

export const ToastContext = createContext(initialState);
export const useToastContext = () => useContext(ToastContext);

const ToastProvider: React.FC<IToastProps> = ({
    children,
    visibilityTime = DEFAULT_VISIBILITY_TIME,
}: IToastProps) => {
    const [toastList, setToastList] = useState<ToastItem[]>([]);

    const addToast = (toastToAdd: ToastItem) => {
        const newList = [...toastList, toastToAdd];
        setToastList(newList);
    };

    const removeAllToasts = () => {
        setToastList([]);
    };

    const removeToast = useCallback(
        (key: string) => {
            const newToastList = toastList.filter(toast => toast.key !== key);
            setToastList(newToastList);
        },
        [toastList],
    );

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastList.length > 0) {
                removeToast(toastList[0].key);
            }
        }, visibilityTime);
        return () => {
            clearInterval(interval);
        };
    }, [toastList, removeToast, visibilityTime]);

    return (
        <ToastContext.Provider value={{toastList, addToast, removeAllToasts}}>
            {children}
            <View style={styles.container} pointerEvents={'box-none'}>
                {toastList.map((toast: ToastItem) => {
                    return (
                        <Toast
                            {...toast}
                            key={toast.key}
                            onDismissAction={() =>
                                toast.onPressDismiss && removeToast(toast.key)
                            }
                        />
                    );
                })}
            </View>
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: navBarHeight + getFVerticalPx(48),
        height: screenHeight,
        width: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: appContainerHorizontalMargin,
    },
});

export default React.memo(ToastProvider);
