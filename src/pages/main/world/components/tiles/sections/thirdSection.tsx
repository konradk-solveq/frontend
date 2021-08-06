import React from 'react';
import {View, Text} from 'react-native';

import {
    MountainIcon,
    WayIcon,
} from '../../../../../../sharedComponents/svg/icons';

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
                    <MountainIcon iconStyle={styles.mountainIcon} />
                    <Text style={stylesThirdSection.text}>
                        {firstPickedDifficulty || ''}
                    </Text>
                </View>

                <View
                    style={[
                        styles.sectionTextRow,
                        stylesThirdSection.firstColumnRightValue,
                    ]}>
                    <WayIcon iconStyle={styles.wayIcon} />
                    <Text style={stylesThirdSection.text}>
                        {firstPickedSurface || ''}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ThirdSection;
