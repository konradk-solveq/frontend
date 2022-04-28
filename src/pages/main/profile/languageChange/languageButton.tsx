import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Svg, {SvgXml, Path, G, Rect} from 'react-native-svg';
import {getHorizontalPx, getVerticalPx, getFontSize} from '@helpers/layoutFoo';

interface IProps {
    active: boolean;
    title: string;
    svg?: string;
    onPress: () => void;
    separator: boolean;
}

const LanguageButton: React.FC<IProps> = ({
    active,
    title,
    svg,
    onPress,
    separator,
}: IProps) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: getHorizontalPx(334),
            height: getVerticalPx(74),
            borderBottomWidth: separator ? 1 : 0,
            borderBottomColor: separator ? '#EAEAEA' : 'transparent',
        },
        checkbox: {
            marginRight: getHorizontalPx(26),
        },
        blueText: {
            fontFamily: 'DIN2014Narrow-Light',
            fontSize: getFontSize(18),
            color: '#3587ea',
            textAlign: 'left',
            position: 'relative',
            marginTop: getVerticalPx(33 / 2),
            marginBottom: getVerticalPx(33 / 2),
        },
        symbol: {
            position: 'absolute',
            right: 0,
            width: getHorizontalPx(32),
            height: getHorizontalPx(32),
            marginLeft: getHorizontalPx(5),
        },
    });

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.container}>
                <View style={styles.checkbox}>
                    {active ? (
                        <Svg
                            width="26"
                            height="26"
                            testID={'language-button-test-active-icon'}>
                            <G fill="none" fill-rule="evenodd">
                                <Rect
                                    stroke="#D8232A"
                                    fill="#D8232A"
                                    x=".5"
                                    y=".5"
                                    width="25"
                                    height="25"
                                    rx="12.5"
                                />
                                <Path
                                    d="M18.649 11.113l-6.331 6.525a1.176 1.176 0 0 1-1.698 0l-3.268-3.369a1.265 1.265 0 0 1 0-1.75 1.176 1.176 0 0 1 1.698 0l2.419 2.493 5.481-5.65a1.176 1.176 0 0 1 1.698 0 1.265 1.265 0 0 1 0 1.751z"
                                    fill="#FFF"
                                    fill-rule="nonzero"
                                />
                            </G>
                        </Svg>
                    ) : (
                        <Svg width="26" height="26">
                            <Rect
                                x=".5"
                                y=".5"
                                width="25"
                                height="25"
                                rx="12.5"
                                stroke="#313131"
                                fill="none"
                            />
                        </Svg>
                    )}
                </View>

                <Text
                    style={styles.blueText}
                    testID={'language-button-test-country-text'}>
                    {title}
                </Text>

                {svg && (
                    <View
                        style={styles.symbol}
                        testID={'language-button-test-country-icon'}>
                        <SvgXml xml={svg} />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default LanguageButton;
