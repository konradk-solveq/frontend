import React from 'react';
import {Linking} from 'react-native';

import {setNewAppVersion} from '@src/storage/actions';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {getFVerticalPx} from '@src/helpers/appLayoutDimensions';
import {BottomModal, ModalHeader} from '@components/modals';
import colors from '@src/theme/colors';
import {Backdrop} from '@src/components/backdrop';
import {HorizontalSpacer} from '@src/components/divider';
import NewAppVersionContainer from '@src/containers/NewAppVersion/NewAppVersionContainer';
import {isIOS} from '@src/utils/platform';
import {storeUrls} from '@src/utils/constants/storeUrls';

interface IProps {
    showModal: boolean;
    forceUpdate: boolean;
    handleGoForward: () => void;
}

const NewAppVersionModal: React.FC<IProps> = ({
    showModal = false,
    forceUpdate,
    handleGoForward,
}: IProps) => {
    const dispatch = useAppDispatch();
    const shopAppVersion = useAppSelector<string>(
        state => state.app.config.version,
    );

    const handleLinkToShop = () => {
        dispatch(setNewAppVersion(shopAppVersion));
        if (isIOS) {
            Linking.openURL(storeUrls.apple);
        } else {
            Linking.openURL(storeUrls.android);
        }
    };

    return (
        <>
            <BottomModal
                show={showModal}
                openModalHeight={getFVerticalPx(688)}
                header={
                    <>
                        <HorizontalSpacer height={forceUpdate ? 60 : 22} />
                        {!forceUpdate && (
                            <ModalHeader onPress={handleGoForward} />
                        )}
                    </>
                }
                style={{
                    backgroundColor: colors.white,
                }}
                testID={'bottom-modal-new-app-version'}>
                <NewAppVersionContainer
                    handlePress={handleLinkToShop}
                    forceUpdate={forceUpdate}
                />
            </BottomModal>
            <Backdrop isVisible={showModal} />
        </>
    );
};

export default NewAppVersionModal;
