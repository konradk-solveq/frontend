import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, SafeAreaView, Text} from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import TypicalRedBtn from '../../../sharedComponents/buttons/typicalRed';
import MyRoutes from './myRoutes/myRoutes';
import {OptionType} from './bikeMap/filters/filtersData';

import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../helpers/layoutFoo';
import FiltersModal from './bikeMap/filters/filtersModal';
import useStatusBarHeight from '../../../hooks/statusBarHeight';
import {FiltersBtn, MapBtn} from '../../../sharedComponents/buttons';

const ww = Dimensions.get('window').width;

type PickedFilters = {
    [key: string]: OptionType[];
};

const World: React.FC = () => {
    const trans: any = I18n.t('MainWorld');
    const statusBarHeight = useStatusBarHeight();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [savedMapFilters, setSavedMapFilters] = useState<PickedFilters>({});

    enum markerTypes {
        BIKEMAP = 'map',
        MYROUTES = 'routes',
        PLANED = 'planed',
    }

    const [markersFilters, setMarkersFilters] = useState<markerTypes[]>([
        markerTypes.BIKEMAP,
    ]);

    const heandleBikeMap = () => {
        if (markersFilters?.includes(markerTypes.BIKEMAP)) {
            return;
        }
        setMarkersFilters([markerTypes.BIKEMAP]);
    };
    const heandleMyRoutes = () => {
        if (markersFilters?.includes(markerTypes.MYROUTES)) {
            return;
        }
        setMarkersFilters([markerTypes.MYROUTES]);
    };
    const heandlePlaned = () => {
        if (markersFilters?.includes(markerTypes.PLANED)) {
            return;
        }
        setMarkersFilters([markerTypes.PLANED]);
    };

    setObjSize(334, 50);
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        headerWrapper: {
            position: 'absolute',
            flexDirection: 'row',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            right: 40,
            top: getVerticalPx(65 - statusBarHeight),
        },
        header: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: getHorizontalPx(18),
            color: '#313131',
            width: '100%',
        },
        headerButtons: {
            flexDirection: 'row',
            right: getHorizontalPx(60),
        },
        headerButton: {
            margin: 0,
        },
        headerButtonLeft: {
            marginRight: 20,
        },
        wrap: {
            width: getHorizontalPx(334),
            left: getHorizontalPx(40),
        },
        btns: {
            height: 41,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: getVerticalPx(138) < 100 ? 100 : getVerticalPx(138),
        },
        btn: {
            marginRight: getHorizontalPx(5),
        },
        title: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 40,
            lineHeight: 52,
            color: '#d8232a',
            textAlign: 'center',
            marginTop: getVerticalPx(37),
        },
        text: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: 23,
            lineHeight: 30,
            letterSpacing: 0.5,
            color: '#313131',
            textAlign: 'left',
            marginTop: getVerticalPx(20),
        },
    });

    const onShowModalHanlder = () => {
        setShowModal(true);
    };

    const onHideModalHandler = () => {
        setShowModal(false);
    };

    const onSetFiltersHandler = (picked: PickedFilters) => {
        setSavedMapFilters(picked);
        onHideModalHandler();
    };

    return (
        <SafeAreaView style={styles.container}>
            <FiltersModal
                onClose={onHideModalHandler}
                definedFilters={savedMapFilters}
                onSave={onSetFiltersHandler}
                showModal={showModal}
            />
            <View style={styles.headerWrapper}>
                <Text style={styles.header}>{trans.header}</Text>
                <View style={styles.headerButtons}>
                    <FiltersBtn
                        onPress={onShowModalHanlder}
                        iconStyle={[
                            styles.headerButton,
                            styles.headerButtonLeft,
                        ]}
                    />
                    <MapBtn
                        onPress={() => {}}
                        iconStyle={styles.headerButton}
                    />
                </View>
            </View>

            <View style={styles.wrap}>
                <View style={styles.btns}>
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnBikeMap}
                        active={markersFilters?.includes(markerTypes.BIKEMAP)}
                        onpress={heandleBikeMap}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnMyRoutes}
                        active={markersFilters?.includes(markerTypes.MYROUTES)}
                        onpress={heandleMyRoutes}
                    />
                    <TypicalRedBtn
                        style={styles.btn}
                        title={trans.btnPlaned}
                        active={markersFilters?.includes(markerTypes.PLANED)}
                        onpress={heandlePlaned}
                    />
                </View>

                {markersFilters?.includes(markerTypes.MYROUTES) && <MyRoutes />}
            </View>

            <TabBackGround />
        </SafeAreaView>
    );
};

export default World;
