import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';

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
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

interface IToastProps {
    children?: React.ReactNode;
}

interface InitialState {
    toastList: ToastItem[];
    addToast: (toast: ToastItem) => void;
    removeToast: (toast: string) => void;
    removeAllToasts: () => void;
}

const initialState: InitialState = {
    toastList: [],
    addToast: () => {},
    removeToast: () => {},
    removeAllToasts: () => {},
};

export const ToastContext = createContext(initialState);
export const useToastContext = () => useContext(ToastContext);

const ToastProvider: React.FC<IToastProps> = ({children}: IToastProps) => {
    const [toastList, setToastList] = useState<ToastItem[]>([]);
    const listRef = useRef(toastList);

    const removeToast = useCallback(
        (key: string) => {
            const newToastList = listRef.current.filter(
                toast => toast.key !== key,
            );
            setToastList(newToastList);
        },
        [listRef],
    );

    const addToast = useCallback(
        (toastToAdd: ToastItem) => {
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
        },
        [removeToast, toastList],
    );

    const removeAllToasts = useCallback(() => {
        if (toastList.length > 0) {
            const newToastList = toastList.filter(el => el.leaveOnScreenChange);
            newToastList.length === 0 && setToastList(newToastList);
        }
    }, [toastList]);

    useEffect(() => {
        listRef.current = toastList;
    }, [toastList]);

    const values = useMemo(
        () => ({
            toastList,
            addToast,
            removeAllToasts,
            removeToast,
        }),
        [toastList, addToast, removeAllToasts, removeToast],
    );

    return (
        <ToastContext.Provider value={values}>
            {children}
            <View style={styles.container} pointerEvents={'box-none'}>
                {toastList.map((toast: ToastItem) => {
                    return (
                        <Toast
                            {...toast}
                            key={toast.key}
                            testID={toast.key}
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
