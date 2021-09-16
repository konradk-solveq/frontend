import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/core';

import {featuredMapsSelector} from '@storage/selectors';
import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {fetchFeaturedMapsList} from '@storage/actions/maps';
import {RegularStackRoute} from '@navigation/route';

import ShowMoreModal from '../../components/showMoreModal/showMoreModal';
import FeaturedRoutesList from './horizontalList/FeaturedRoutesHorizontalList';

import styles from './style';

const FeaturedRoutes: React.FC = () => {
    const mountedRef = useRef(false);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const featuredMaps = useAppSelector(featuredMapsSelector);

    const [showModal, setShowModal] = useState(false);
    const [activeMapID, setActiveMapID] = useState<string>('');

    useEffect(() => {
        if (!featuredMaps?.length && !mountedRef.current) {
            mountedRef.current = true;
            dispatch(fetchFeaturedMapsList());
        }

        return () => {
            mountedRef.current = false;
        };
    }, [dispatch, featuredMaps?.length]);

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

    const onShowMoreHandler = (sectionID: string, sectionName?: string) => {
        navigation.navigate({
            name: RegularStackRoute.FEATURED_ROUTES_SCRREN,
            params: {
                sectionID: sectionID,
                sectionName: sectionName || '',
            },
        });
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
