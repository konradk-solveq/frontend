import React, {useRef, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet} from 'react-native';
import {View, Platform} from 'react-native';
import {WebView} from 'react-native-webview';

import gradient from './gradientSvg';

const {width} = Dimensions.get('window');

interface IProps {}

const Apla: React.FC<IProps> = ({}: IProps) => {
    return <View pointerEvents="none" />;
};

const styles = StyleSheet.create({});

export default Apla;
