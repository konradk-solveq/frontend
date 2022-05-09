import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import GenericScreen from '@pages/template/GenericScreen';
import {AddBikeFrameInfoContainer} from '@containers/AddBike';
import {useAppNavigation} from '@navigation/hooks/useAppNavigation';

const AddBikeFrameInfo: React.FC = () => {
    const {t} = useMergedTranslation('AddBikeFrameInfo');
    const navigation = useAppNavigation();

    const onNavigateBack = () => {
        navigation.goBack();
    };

    return (
        <GenericScreen
            screenTitle={t('headerTitle')}
            contentBelowHeader
            transculentStatusBar>
            <AddBikeFrameInfoContainer onPress={onNavigateBack} />
        </GenericScreen>
    );
};

export default AddBikeFrameInfo;
