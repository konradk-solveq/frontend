import { Header3, Subtitle } from '@src/components/texts/texts';
import React from 'react';
import {View} from 'react-native';

interface IStatisticElementProps {
    text: string;
    value: string;
    testID: string;
}

const StatisticElement: React.FC<IStatisticElementProps> = ({text, value, testID}) => {
    return (
        <View>
            <View testID={testID}>
                <Subtitle>
                    {text}
                </Subtitle>
                <Header3>
                    {value}
                </Header3>
            </View>
        </View>
    )
}

export default StatisticElement;
