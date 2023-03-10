import React, {createContext, useContext, useState} from 'react';

import TopNotification from '@src/sharedComponents/notifications/TopNotification';

type contType = {
    notificationContennt?: string;
    setNotificationVisibility: (content: string) => void;
};

export const NotificationContext = createContext<contType>({
    notificationContennt: undefined,
    setNotificationVisibility: (content: string) => {},
});

export const useNotificationContext = () => useContext(NotificationContext);

interface IProps {
    children?: React.ReactNode;
    duration?: number;
    hideTimeout?: number;
}

const TopNotificationProvider: React.FC<IProps> = ({children}: IProps) => {
    const [notificationContent, setNotificationContent] = useState('');

    const onSetNotificationHandler = (content: string) => {
        setNotificationContent(content);
    };

    const onHideNotificationHandler = () => {
        setNotificationContent('');
    };

    return (
        <NotificationContext.Provider
            value={{
                notificationContennt: notificationContent,
                setNotificationVisibility: onSetNotificationHandler,
            }}>
            {children && children}
            <TopNotification
                content={notificationContent}
                onHideNotification={onHideNotificationHandler}
            />
        </NotificationContext.Provider>
    );
};

export default React.memo(TopNotificationProvider);
