import React from 'react';
import {useMergedTranslation} from '@utils/translations/useMergedTranslation';
import GenericScreen from '@pages/template/GenericScreen';
import colors from '@theme/colors';
import ReviewDetailsContainer from '@containers/Bike/ReviewDetailsContainer';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
    ReviewDetailsRouteT,
    ReviewDetailsNavigationPropT,
} from '@type/rootStack';

const ReviewsDetails: React.FC = () => {
    const {t} = useMergedTranslation('ReviewsDetails');
    const route = useRoute<ReviewDetailsRouteT>();
    const details = route.params.details;
    const navigation = useNavigation<ReviewDetailsNavigationPropT>();

    const handleServicesMap = () => {
        navigation.navigate('ServicesMap');
    };

    return (
        <GenericScreen
            transculentStatusBar
            transculentBottom
            screenTitle={t('header')}
            backgroundColor={colors.whiteGrey}
            contentBelowHeader>
            <ReviewDetailsContainer
                date={details.date}
                checkmark={!!details.style?.checkmark}
                operations={details.operations}
                type={details.type}
                info={details.info}
                overviewsTitle={t('descriptionTitle')}
                onServicesTilePress={handleServicesMap}
                warning={t('warning')}
            />
        </GenericScreen>
    );
};

export default ReviewsDetails;
