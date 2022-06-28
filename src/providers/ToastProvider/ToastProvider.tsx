import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
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
import {v4 as uuidv4} from 'uuid';

const DEFAULT_VISIBILITY_TIME = 3000;

export interface ToastItem extends NotificationI {
    key: string;
    testID?: string;
    onPressDismiss?: boolean;
    onDismissAction?: () => void;
    leaveOnScreenChange?: boolean;
    durationTime?: number;
}

interface IToastProps {
    children?: React.ReactNode;
}

const initialState = {
    toastList: [],
    addToast: (toast: ToastItem) => {},
    removeToast: (toast: ToastItem) => {},
    removeAllToasts: () => {},
};

export const ToastContext = createContext(initialState);
export const useToastContext = () => useContext(ToastContext);

const ToastProvider: React.FC<IToastProps> = ({children}: IToastProps) => {
    const [toastList, setToastList] = useState<ToastItem[]>([]);
    const listRef = useRef(toastList);

    const addToast = (toastToAdd: ToastItem) => {
        const key = uuidv4();
        const newList = [
            ...toastList,
            {...toastToAdd, key}, // Add additional key to prevent adding elements with same key in array
        ];
        setToastList(newList);
        setTimeout(
            () => removeToast(key),
            toastToAdd.durationTime || DEFAULT_VISIBILITY_TIME,
        );
    };

    const removeAllToasts = () => {
        if (toastList.length > 0) {
            const newToastList = toastList.filter(el => el.leaveOnScreenChange);
            newToastList.length === 0 && setToastList(newToastList);
        }
    };

    const removeToast = useCallback(
        (key: string) => {
            const newToastList = listRef.current.filter(
                toast => toast.key !== key,
            );
            setToastList(newToastList);
        },
        [listRef],
    );

    useEffect(() => {
        listRef.current = toastList;
    }, [toastList]);

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
        bottom: navBarHeight + getFVerticalPx(44),
        height: screenHeight,
        width: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: appContainerHorizontalMargin,
    },
});

export default React.memo(ToastProvider);
