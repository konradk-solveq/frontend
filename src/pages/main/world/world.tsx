import React, { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, View, Text } from 'react-native';
import I18n from 'react-native-i18n';
import TabBackGround from '../../../sharedComponents/navi/tabBackGround';
import AnimSvg from '../../../helpers/animSvg';

import {
    setAppSize,
    setObjSize,
    getCenterLeft,
    getCenterLeftPx,
    getTopPx,
    getWidth,
    getWidthPx,
    getWidthPxOf,
    getHeightPx,
} from '../../../helpers/layoutFoo';

interface Props {
    navigation: any,
    route: any,
};

const World: React.FC<Props> = (props: Props) => {

    // const trans = I18n.t('Profile').view;

    const piont = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 202">
    <defs/>
    <circle cx="207.96" cy="101.03" r="100.71" fill="#f67e83" fill-opacity=".2" paint-order="markers fill stroke">
        <animate attributeName="r" begin="0.2s" dur="0.5s" repeatCount="1" values="0 ; 100.71" fill="freeze"/>
    </circle>
    <path fill="none" stroke="#d8232a" stroke-dasharray="6 8" stroke-linecap="round" d="M-3.51 93.14c25.58-.3 52.63 3.88 84.7 28.71 32.04 24.82 60.31 43.8 91.3 53.09 30.98 9.3 92.75 15.9 126 6.4 33.26-9.5 44.62-24.47 47.4-32.95 2.77-8.47 6.86-22.71-16.07-33.96-19.1-9.36-35.22-12.18-58.3-19.72-23.08-7.54-34.1-39.08-2.57-51.4 41.16-16.1 95.78-27.43 152.25-35.23">
        <animate attributeName="stroke-dashoffset" dur="5s" repeatCount="indefinite" values="0 ; -140"/>
    </path>
    <path transform-origin="204.08 170.55" transform="scale(0)" fill="#fff" stroke="#d8232a" d="M264.18 101.97a65.6 65.6 0 01-3.33 6.6l-.64 1.1c-.54.91-1.12 1.86-1.73 2.82l-.75 1.16c-.51.79-1.04 1.58-1.6 2.4l-.84 1.21-.88 1.24-.91 1.26-.94 1.27-.49.65-.99 1.3-1.02 1.32-1.05 1.33-1.08 1.35-1.12 1.37-1.14 1.38-1.18 1.4-1.2 1.4-1.24 1.42-1.27 1.44-1.3 1.45-1.33 1.46-1.36 1.48-1.38 1.48-1.42 1.5-1.45 1.5-1.48 1.52-.75.76-1.52 1.53-2.33 2.32-1.6 1.55-1.62 1.56-.82.78-1.66 1.57-1.7 1.57-1.71 1.58-1.75 1.59-1.77 1.59-1.8 1.59-1.84 1.6-1.85 1.6-1.88 1.59-2.38 1.99-2.13-2.8-1.7-2.2-1.66-2.17-1.64-2.12-1.62-2.08-1.6-2.04-2.34-2.99-1.53-1.94-1.5-1.9-1.48-1.88-1.45-1.83-1.42-1.8-1.4-1.76-1.38-1.73-.67-.85-1.34-1.68-1.3-1.64-1.28-1.61-1.26-1.58-1.22-1.55-1.2-1.51-1.17-1.49-1.14-1.45-1.12-1.42-1.08-1.4-1.06-1.36-1.03-1.33-1-1.31-.5-.64-.95-1.27-.47-.62-.91-1.22-.45-.6-.87-1.19-.43-.58-.83-1.15-.8-1.12-.77-1.09-.37-.54-.73-1.05-.7-1.04c-.45-.67-.88-1.34-1.3-1.99l-.6-.96a56.6 56.6 0 01-3.93-7.24c-16.33-34.84 5.9-62.06 58.52-67.99l1.6-.17c52.72-5.3 72.78 25.53 53.3 71.3zm-56.02-41.1c-10.22.53-18.65 6.86-18.84 14.13-.2 7.27 7.79 13.2 17.82 13.24 10.04.04 18.47-6.29 18.84-14.13.37-7.85-7.6-13.78-17.82-13.24z">
        <animateTransform attributeName="transform" attributeType="XML" type="scale" values="0 ; 0.4 ; 0.75 ; 1" dur="0.7s" begin="0.3s" repeatCount="1" fill="freeze"/>
    </path>
</svg>`;

    const piont2 = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 416 202"/>'

    const [showImg, setShowImg] = useState(false); // do odpalania animacji svg
    const [refresh, setRefresh] = useState(0); // do odpalania animacji svg

    useEffect(() => {
        if (props.route && props.route.params && props.route.params.refresh && refresh != props.route.params.refresh) {
            setShowImg(false)
            setTimeout(() => { setShowImg(true); setRefresh(props.route.params.refresh) }, 60);
        }
        return () => { setShowImg(false) }
    }, [props.route.params])

    const ww = Dimensions.get('window').width;
    const wh = Dimensions.get('window').height;
    setAppSize(ww, wh);

    const t = getTopPx(348);
    const h = ww * (202 / 416);
    const th = getTopPx(300);
    const image = {
        position: 'absolute',
        width: ww,
        height: h,
        // backgroundColor: "khaki",
        top: t
    };

    setObjSize(334, 23);
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: "#fdf5f5"
        },
        image,
        header: {
            position: 'absolute',
            width: getWidthPx(),
            left: getCenterLeftPx(),
            top: getTopPx(65),
            fontFamily: "DIN2014Narrow-Light",
            textAlign: 'center',
            fontSize: 18,
            color: '#313131'
        },
        title: {
            position: 'absolute',
            top: t - th + getTopPx(21),
            fontFamily: "DIN2014Narrow-Regular",
            fontSize: 40,
            color: '#d8232a',
            textAlign: 'center',
            textAlignVertical: 'bottom',
            width: getWidthPx(),
            height: th,
            left: getCenterLeftPx()
        },
        text: {
            position: 'absolute',
            top: t + h + getTopPx(20),
            fontFamily: "DIN2014Narrow-Light",
            fontSize: 23,
            color: '#313131',
            textAlign: 'left',
            width: getWidthPx(),
            left: getCenterLeftPx(),
        }
    })

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.header}>Świat Kross</Text>

            {showImg && <AnimSvg
                style={styles.image}
                source={showImg ? piont : piont2}
            />}

            <Text style={styles.title}>Już niedługo zapraszamy na wspólną wycieczkę</Text>

            <Text style={styles.text}>Za klikanaście dni w tym miejscu znajdziesz trasy rowerower rekomendowane przez KROSS. </Text>

            <TabBackGround></TabBackGround>

        </SafeAreaView>
    )
}


export default World