import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {AddBtn} from '@sharedComponents/buttons';
import ImageSwiper from '@sharedComponents/imageSwiper/imageSwiper';
import {ImageType} from '@interfaces/form';
import {getFVerticalPx, getFHorizontalPx} from '@helpers/appLayoutDimensions';
import CameraSvg from '../svg/CameraSvg';
import colors from '@theme/colors';
import {Header3} from '@components/texts/texts';
import {prepareImage} from '@utils/images';

interface IProps {
    images: string[];
    onAddImage: (imageUri: ImageType) => void;
    onRemoveImage: (imageUri: string) => void;
    placeholderText: string;
}

interface IPlaceholderProps {
    message: string;
}

const Placeholder = ({message}: IPlaceholderProps) => (
    <View style={styles.placeholderContainer}>
        <View style={styles.iconContainer}>
            <CameraSvg />
        </View>
        <Header3>{message}</Header3>
    </View>
);
const ImagesInput: React.FC<IProps> = ({
    images,
    onAddImage,
    onRemoveImage,
    placeholderText,
}: IProps) => {
    const [isBlocked, setIsBocked] = useState(false);

    const onAddImageHandler = () => {
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
            {images.length < 1 ? (
                <Pressable onPress={onAddImageHandler} style={styles.pressable}>
                    <Placeholder message={placeholderText} />
                </Pressable>
            ) : (
                <>
                    <AddBtn
                        onPress={onAddImageHandler}
                        containerStyle={styles.btn}
                        disabled={isBlocked}
                    />
                    <ImageSwiper
                        images={images}
                        withRemoveButton
                        onPressRemove={onRemoveImage}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    btn: {
        marginRight: getFHorizontalPx(8),
    },
    placeholderContainer: {
        height: getFVerticalPx(134),
        borderRadius: getFVerticalPx(10),
        width: '100%',
        backgroundColor: colors.whiteGrey,
        alignItems: 'center',
    },
    pressable: {
        width: '100%',
    },
    iconContainer: {
        width: getFVerticalPx(54),
        height: getFVerticalPx(54),
        borderRadius: getFVerticalPx(27),
        backgroundColor: colors.white,
        marginTop: getFVerticalPx(24),
        marginBottom: getFVerticalPx(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImagesInput;
