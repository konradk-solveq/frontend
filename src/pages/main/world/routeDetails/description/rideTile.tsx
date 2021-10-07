import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {I18n} from '../../../../../../I18n/I18n';

import AnimSvg from '../../../../../helpers/animSvg';

import {useAppDispatch, useAppSelector} from '@hooks/redux';
import {ReactionsType} from '@models/map.model';
import {mapReactionsConfigSelector} from '@storage/selectors/app';
import {modifyReaction} from '@storage/actions/maps';
import {
    setObjSize,
    getCenterLeftPx,
    getHorizontalPx,
    getVerticalPx,
    getWidthPx,
} from '../../../../../helpers/layoutFoo';
import BikeIcon from '../../../../../sharedComponents/svg/bikeIcon';
import ClockIcon from '../../../../../sharedComponents/svg/clockIcon';
import MountainIcon from '../../../../../sharedComponents/svg/mountainIcon';
import WayIcon from '../../../../../sharedComponents/svg/wayIcon';
import FourthSection from '../../components/tiles/sections/fourthSection';

interface Props {
    mapId?: string;
    distance?: string;
    time?: string;
    level?: string;
    type?: string;
    containerStyle?: any;
    reactions?: ReactionsType;
    reaction?: string;
}

const RideTile: React.FC<Props> = ({
    mapId,
    distance,
    time,
    level,
    type,
    containerStyle,
    reactions,
    reaction,
}: Props) => {
    const trans: any = I18n.t('RoutesDetails');
    const dispatch = useAppDispatch();

    const config = useAppSelector(mapReactionsConfigSelector);
    const likeValue = config?.find(c => c.enumValue === 'like');
    const likesNumber = likeValue?.enumValue
        ? reactions?.[likeValue.enumValue as keyof ReactionsType] || 0
        : 0;

    const [currentLikeNumber, setCurrentLikeNumber] = useState(likesNumber);

    setObjSize(412, 50);
    const w = getWidthPx();
    const l = getCenterLeftPx();

    const [source, setSource] = useState(
        '<svg xmlns="http://www.w3.org/2000/svg"/>',
    ); // do odpalania animacji svg
    const [boxStyle, setBoxStyle] = useState({}); // do odpalania animacji svg

    const handleShadowBox = (layout: any) => {
        let b = 30;
        let w = layout.width - 1;
        let h = layout.height - 1;

        let svg =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' +
            -b +
            ' ' +
            -b +
            ' ' +
            (w + b * 2) +
            ' ' +
            (h + b * 2) +
            '" width="' +
            (w + b + b) +
            '" height="' +
            (h + b + b) +
            '">';
        svg +=
            '<filter id="filter" x="-1" width="3" y="-1" height="3"><feGaussianBlur stdDeviation="' +
            b * 0.4 +
            '"/></filter>';
        svg +=
            '<rect filter="url(#filter)" opacity=".12" fill="#000" stroke="none" width="' +
            w +
            '" height="' +
            h +
            '" x="' +
            0 +
            '" y="' +
            0 +
            '" ry="24"/>';
        svg +=
            '<rect fill="#fff" stroke="none" width="' +
            w +
            '" height="' +
            h +
            '" x="' +
            0 +
            '" y="' +
            0 +
            '" ry="' +
            getHorizontalPx(32) +
            '"/>';
        svg += '</svg>';

        setSource(svg);

        setBoxStyle({
            position: 'absolute',
            left: -b,
            top: -b,
            width: w + b * 2,
            height: h + b * 2,
        });
    };

    const styles = StyleSheet.create({
        container: {
            left: l,
            width: getHorizontalPx(334),
            height: getHorizontalPx(180),
            borderRadius: getHorizontalPx(32),
            backgroundColor: 'transparent',
        },
        textLine: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            height: getHorizontalPx(60),
            justifyContent: 'center',
        },
        textContainer: {
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: getVerticalPx(31),
        },
        topText: {
            fontFamily: 'DIN2014Narrow-Regular',
            fontSize: 23,
            color: '#313131',
            textAlign: 'center',
        },
        bottomText: {
            fontFamily: 'DIN2014Narrow-Light',
            textAlign: 'center',
            fontSize: 15,
            letterSpacing: 0.42,
            color: '#555555',
        },
        textSuffix: {
            fontSize: 18,
            letterSpacing: 0.5,
            color: '#555555',
        },
        line: {
            borderBottomColor: '#ebebeb',
            borderBottomWidth: 1,
        },
        verticalLine: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: '50%',
            borderRightColor: '#ebebeb',
            borderRightWidth: 1,
        },
        iconContainer: {
            marginRight: getHorizontalPx(7),
        },
        icon: {
            marginLeft: 0,
        },
        iconTop: {
            marginLeft: 0,
            marginTop: 5,
        },
        likekSection: {
            marginTop: getHorizontalPx(7),
        },
    });

    const onLikePressedHandler = useCallback(
        (state: boolean) => {
            setCurrentLikeNumber(prev => (!state ? prev - 1 : prev + 1));
            if (mapId) {
                dispatch(
                    modifyReaction(
                        mapId,
                        likeValue?.enumValue || 'like',
                        !state,
                    ),
                );
            }
        },
        [dispatch, likeValue, mapId],
    );

    return (
        <View
            style={[styles.container, containerStyle]}
            onLayout={({nativeEvent}) => handleShadowBox(nativeEvent.layout)}>
            <AnimSvg source={source} style={boxStyle} />
            <View>
                <View style={[styles.textLine, styles.line]}>
                    <View style={styles.verticalLine} />
                    <View style={styles.textContainer}>
                        <BikeIcon
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.iconTop}
                        />
                        <Text style={styles.topText}>
                            {distance} <Text style={styles.textSuffix}>km</Text>
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <ClockIcon
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.iconTop}
                        />
                        <Text style={styles.topText}>
                            {time || '-:--'}{' '}
                            <Text style={styles.textSuffix}>h</Text>
                        </Text>
                    </View>
                </View>

                <View style={[styles.textLine, styles.line]}>
                    <View style={styles.verticalLine} />
                    <View style={styles.textContainer}>
                        <MountainIcon
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.icon}
                        />
                        <Text style={styles.bottomText}>
                            {level || trans.noInfo}
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        <WayIcon
                            containerStyle={styles.iconContainer}
                            iconStyle={styles.icon}
                        />
                        <Text style={styles.bottomText}>
                            {type || trans.noInfo}
                        </Text>
                    </View>
                </View>

                <View style={styles.likekSection}>
                    <FourthSection
                        likeGaved={reaction === likeValue?.enumValue}
                        onLikePress={onLikePressedHandler}
                        likeValue={currentLikeNumber}
                        likeSize={22}
                    />
                </View>
            </View>
        </View>
    );
};

export default RideTile;
