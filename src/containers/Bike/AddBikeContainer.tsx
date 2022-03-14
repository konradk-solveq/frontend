import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {HorizontalDividerWithSeparator} from '@components/divider';
import {BodyPrimary, Header2} from '@components/texts/texts';
import {LinkButton, PrimaryButton} from '@components/buttons';
import {
    getFHorizontalPx,
    getFVerticalPx,
} from '@theme/utils/appLayoutDimensions';

interface IProps {}

const AddBikeContainer: React.FC<IProps> = ({}: IProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.upperCell}>
                <Image
                    source={require('@assets/images/bike_placeholder_2.png')}
                    style={{
                        width: getFHorizontalPx(364),
                        height: getFHorizontalPx(280),
                    }}
                />
                <View style={styles.upperTextContainer}>
                    <Header2 algin="center">Skan NFC</Header2>
                    <BodyPrimary algin="center">
                        {
                            'Jeśli masz rower od xxxx to naklejka nfc \n znajduje się przy kierownicy'
                        }
                    </BodyPrimary>
                </View>
            </View>
            <HorizontalDividerWithSeparator separatorText="lub" />
            <View style={styles.bottomCell}>
                <View style={styles.bottomTextContainer}>
                    <Header2
                        algin="center"
                        style={{
                            paddingBottom: getFVerticalPx(16),
                        }}>
                        Wprowadź ręcznie nr ramy
                    </Header2>
                    <LinkButton
                        text="Gdzie znajdę nr ramy?"
                        onPress={() =>
                            console.log(
                                "pressed - where find bike's frame number",
                            )
                        }
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <PrimaryButton
                        text="Skan NFC"
                        onPress={() => {}}
                        style={styles.button}
                    />
                    <PrimaryButton
                        text="Wprowadź ręcznie nr ramy"
                        onPress={() => {}}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    upperCell: {
        // flexGrow: 1,
    },
    bottomCell: {
        // flexGrow: 1,
        marginTop: getFVerticalPx(48),
    },
    upperTextContainer: {
        alignItems: 'center',
        marginBottom: getFVerticalPx(48),
    },
    bottomTextContainer: {
        alignItems: 'center',
        marginBottom: getFVerticalPx(56),
    },
    buttonsContainer: {
        alignItems: 'center',
    },
    button: {
        marginBottom: getFVerticalPx(16),
    },
});

export default AddBikeContainer;
