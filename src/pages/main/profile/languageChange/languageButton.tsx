import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {HorizontalDivider} from '@src/components/divider';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {getFVerticalPx} from '@src/theme/utils/appLayoutDimensions';
import {SvgXml} from 'react-native-svg';
import {BodyPrimary} from '@src/components/texts/texts';
import TickSvg from '@src/components/svg/Tick';

interface IProps {
    active: boolean;
    title: string;
    svg: string;
    onPress: () => void;
    separator: boolean;
    testID?: string;
}

const LanguageButton: React.FC<IProps> = ({
    active,
    title,
    svg,
    onPress,
    separator,
    testID = 'language-button',
}: IProps) => {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: getFVerticalPx(50),
            width: '100%',
            paddingHorizontal: appContainerHorizontalMargin,
        },
        tickIconContainer: {
            marginLeft: 'auto',
        },
        languageIcon: {
            marginRight: getFVerticalPx(10),
        },
    });

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={styles.container}>
                <SvgXml
                    style={styles.languageIcon}
                    xml={svg}
                    height={getFVerticalPx(16)}
                    width={getFVerticalPx(16)}
                    testID={`${testID}-test-country-icon`}
                />
                <BodyPrimary
                    algin="center"
                    testID={`${testID}-test-country-text`}>
                    {title}
                </BodyPrimary>
                {active ? (
                    <View
                        style={styles.tickIconContainer}
                        testID={`${testID}-test-active-icon`}>
                        <TickSvg />
                    </View>
                ) : null}
            </View>
            {separator && <HorizontalDivider />}
        </TouchableOpacity>
    );
};

export default LanguageButton;
