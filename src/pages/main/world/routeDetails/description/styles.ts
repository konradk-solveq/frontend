import {StyleSheet} from 'react-native';

import {getVerticalPx} from '../../../../../helpers/layoutFoo';

const styles = StyleSheet.create({
    container: {
        marginTop: getVerticalPx(20),
        marginBottom: getVerticalPx(40),
    },
    textStyle: {
        fontFamily: 'DIN2014Narrow-Regular',
        fontSize: 18,
        letterSpacing: 0.5,
        color: '#313131',
    },
    smallText: {
        letterSpacing: 0.42,
        fontSize: 15,
    },
    color555555: {
        color: '#555555',
    },
    title: {
        fontSize: 40,
        letterSpacing: 0,
    },
    lightFont: {
        fontFamily: 'DIN2014Narrow-Light',
    },
    tileWrapper: {
        marginTop: getVerticalPx(27),
        marginBottom: getVerticalPx(31),
    },
    descriptionContainer: {
        marginTop: getVerticalPx(15),
        marginBottom: getVerticalPx(30),
    },
    descriptionTitle: {
        fontSize: 23,
        marginBottom: getVerticalPx(10),
    },
    imagesContainer: {
        marginBottom: getVerticalPx(30),
    },
    imagesTitle: {
        marginBottom: getVerticalPx(15),
    },
    mapContainer: {
        marginBottom: getVerticalPx(30),
    },
    mapImage: {
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        height: 285,
    },
    mImg: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f7f7f7',
    },
    mapTitle: {
        marginBottom: getVerticalPx(15),
    },
    tagsContainer: {
        marginBottom: getVerticalPx(32),
    },
    tagsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginTop: getVerticalPx(15),
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        marginRight: 5,
        borderRadius: 14.5,
        height: 29,
        justifyContent: 'center',
    },
    galleryWrapper: {
        flex: 1,
        backgroundColor: '#313131',
        alignItems: 'center',
        paddingBottom: getVerticalPx(60),
    },
    closeGalleryBtnContainer: {
        position: 'absolute',
        right: 20,
        zIndex: 10,
    },
    swiperContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    authorText: {
        color: '#ffffff',
        position: 'absolute',
        bottom: getVerticalPx(100),
        fontSize: 15,
        letterSpacing: 0.42,
        fontFamily: 'DIN2014Narrow-Regular',
        left: 40,
    },
});

export default styles;