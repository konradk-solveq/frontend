import {RadioButton} from '@src/components/buttons';
import {HorizontalDivider} from '@src/components/divider';
import {appContainerHorizontalMargin} from '@src/theme/commonStyle';
import {MykrossIconFont} from '@src/theme/enums/iconFonts';
import {BikeType} from '@src/type/bike';
import React, {Fragment, useCallback} from 'react';
import {View} from 'react-native';

interface IProps {
    bikeTypes: BikeType[];
    bikeType: string;
    onPress: (type: string) => void;
    testID?: string;
}

const RadioListItem: React.FC<IProps> = ({
    bikeTypes,
    bikeType,
    onPress,
    testID = 'radio-list-item-test-id',
}: IProps) => {
    const onPressHandler = useCallback(
        (t: string) => {
            onPress(t);
        },
        [onPress],
    );

    return (
        <View testID={testID}>
            {bikeTypes.map((bt, i) => {
                const lastElement = i === bikeTypes.length - 1;
                const isSelected = bikeType === bt.enumValue;

                return (
                    <Fragment key={bt.enumValue}>
                        <View
                            style={{
                                paddingHorizontal: appContainerHorizontalMargin,
                            }}>
                            <RadioButton
                                text={bt.i18nValue}
                                icon={
                                    isSelected
                                        ? MykrossIconFont.MYKROSS_ICON_RADIAL_ON
                                        : MykrossIconFont.MYKROSS_ICON_RADIAL_OFF
                                }
                                onPress={() => onPressHandler(bt.enumValue)}
                                testID={`${testID}-radio-button-${bt.enumValue}`}
                            />
                        </View>
                        {!lastElement && <HorizontalDivider />}
                    </Fragment>
                );
            })}
        </View>
    );
};

export default React.memo(RadioListItem);
