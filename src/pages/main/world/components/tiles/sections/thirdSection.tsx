import React from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/commonStyles';
import stylesThirdSection from '../styles/styleThirdSection';

interface IProps {
    firstPickedDifficulty?: string;
    firstPickedSurface?: string;
}

const ThirdSection: React.FC<IProps> = ({
    firstPickedDifficulty,
    firstPickedSurface,
}: IProps) => {
    return (
        <View style={[styles.sectionContentRow, styles.section]}>
            <View style={stylesThirdSection.firstColumn}>
                <View
                    style={[
                        styles.sectionTextRow,
                        stylesThirdSection.firstColumnLeftValue,
                    ]}>
                    <View style={styles.mountainIconFontWrap}>
                        <Text style={styles.mountainIconFont}>h</Text>
                    </View>
                    <Text style={stylesThirdSection.text}>
                        {firstPickedDifficulty || ''}
                    </Text>
                </View>

                <View
                    style={[
                        styles.sectionTextRow,
                        stylesThirdSection.firstColumnRightValue,
                    ]}>
                    <View style={styles.wayIconFontWrap}>
                        <Text style={styles.wayIconFont}>g</Text>
                    </View>
                    <Text style={stylesThirdSection.text}>
                        {firstPickedSurface || ''}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ThirdSection;
