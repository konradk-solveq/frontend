import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {AddBtn} from '@sharedComponents/buttons';
import ImageSwiper from '@sharedComponents/imageSwiper/imageSwiper';
import {ImageType} from '@interfaces/form';
import {prepareImage} from '@pages/main/world/editDetails/form/utils';

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
        ImagePicker.openPicker({
            mediaType: 'photo',
            compressImageMaxWidth: 2056,
            compressImageMaxHeight: 2056,
            multiple: true,
            maxFiles: 0, //iOS only, passing 0 allows to pick any number of photos (default - maxFiles: 5)
        })
            .then(selectedImages => {
                /* TODO: on error */
                selectedImages.forEach(img => {
                    if (
                        typeof img?.sourceURL !== 'undefined' ||
                        typeof img?.path !== 'undefined'
                    ) {
                        onAddImage(prepareImage(img));
                    }
                });
            })
            .finally(() => {
                setIsBocked(false);
            });
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
