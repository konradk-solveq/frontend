import React, {useState} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';

import StackHeader from '@sharedComponents/navi/stackHeader/stackHeader';
import TypicalRedBtn from '@sharedComponents/buttons/typicalRed';
import ImgKross from '../../../main/addBike/addBikeFrameInfo/imgKross';
import ImgOther from './imgOther';

import {
    setObjSize,
    getWidthPx,
    getVerticalPx,
    getCenterLeftPx,
    getFontSize,
} from '@helpers/layoutFoo';
import {commonStyle as comStyle} from '@helpers/commonStyle';
import GenericScreen from '@src/pages/template/GenericScreen';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {
    Header2,
    Header3,
    Paragraph,
    Subtitle,
} from '@src/components/texts/texts';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@src/theme/utils/appLayoutDimensions';
import {PrimaryButton} from '@src/components/buttons';
import colors from '@src/theme/colors';
import {color} from '@storybook/addon-knobs';
import {RectangleWithShadow} from '@src/components/svg';
import {AddBikeFrameInfoContainer} from '@src/containers/AddBike';
import {useAppNavigation} from '@src/navigation/hooks/useAppNavigation';

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
