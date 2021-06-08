import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {ImageType} from '../../../../../../interfaces/form';

import {AddBtn} from '../../../../../../sharedComponents/buttons';
import ImageSwiper from '../../../../../../sharedComponents/imageSwiper/imageSwiper';

interface IProps {
    images: string[];
    onAddImage: (imageUri: ImageType) => void;
    onRemoveImage: (imageUri: string) => void;
}

const ImagesInput: React.FC<IProps> = ({
    images,
    onAddImage,
    onRemoveImage,
}: IProps) => {
    const [isBlocked, setIsBocked] = useState(false);

    const onAddImageHanlder = () => {
        setIsBocked(true);
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 2056,
                maxHeight: 2056,
            },
            o => {
                /* TODO: on error */
                if (typeof o?.uri !== 'undefined') {
                    onAddImage(o);
                }
                setIsBocked(false);
            },
        );
    };

    return (
        <View style={styles.container}>
            <AddBtn
                onPress={onAddImageHanlder}
                containerStyle={styles.btn}
                disabled={isBlocked}
            />
            {images?.length > 0 && (
                <ImageSwiper
                    images={images}
                    withRemoveButton
                    onPressRemove={onRemoveImage}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    btn: {
        marginRight: 15,
    },
});

export default ImagesInput;
