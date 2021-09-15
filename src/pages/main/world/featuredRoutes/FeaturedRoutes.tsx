import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/core';

import {featuredMapsSelector} from '../../../../storage/selectors';
import {useAppSelector} from '../../../../hooks/redux';
import {Map} from '../../../../models/map.model';
import {I18n} from '../../../../../I18n/I18n';

import styles from './style';
import ShowMoreModal from '../components/showMoreModal/showMoreModal';
import {RegularStackRoute} from '../../../../navigation/route';
import FeaturedRoutesList from './FeaturedRoutesList/FeaturedRoutesHorizontalList';

interface RenderItem {
    item: Map;
    index: number;
    sectionHeader?: string;
}

interface IProps {}

const FeaturedRoutes: React.FC<IProps> = ({}: IProps) => {
    const trans: any = I18n.t('MainWorld.PlannedRoutes');
    const navigation = useNavigation();

    const featuredMaps = useAppSelector(featuredMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    const onPressHandler = (state: boolean, mapID?: string) => {
        setShowModal(state);
        if (mapID) {
            setActiveMapID(mapID);
        }
    };

    const onPressTileHandler = (mapID?: string) => {
        navigation.navigate({
            name: RegularStackRoute.ROUTE_DETAILS_SCREEN,
            params: {
                mapID: mapID,
                private: false,
                favourite: false,
                featured: true,
            },
        });
    };

    const onShowMoreHandler = (sectionID: string) => {
        console.log('[onShowMoreHandler -- pressed]');
    };

    if (!featuredMaps?.length) {
        return null;
    }

    return (
        <>
            <ShowMoreModal
                showModal={showModal}
                mapID={activeMapID}
                onPressCancel={() => onPressHandler(false)}
                backdropStyle={styles.backdrop}
                isFeatured
            />
            {featuredMaps.map(fm => {
                if (!fm?.routes?.elements?.length) {
                    return null;
                }

                const sectionHeader = fm?.section?.title;
                return (
                    <FeaturedRoutesList
                        key={fm?.section?.id}
                        data={fm?.routes?.elements}
                        sectionID={fm?.section?.id}
                        sectionHeader={sectionHeader}
                        onPressMore={onPressHandler}
                        onPressElement={onPressTileHandler}
                        onShowMore={onShowMoreHandler}
                    />
                );
            })}
        </>
    );
};

export default React.memo(FeaturedRoutes);
