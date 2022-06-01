import {Image} from 'react-native-image-crop-picker';
import {ImageType} from '@interfaces/form';

const getNameFromPath = (path: string | undefined): string =>
    path?.split('/').pop() ?? '-';

export const prepareImage = ({
    path,
    sourceURL,
    size,
    height,
    width,
    filename,
    mime,
}: Image): ImageType => ({
    fileName: filename ?? getNameFromPath(path || sourceURL),
    fileSize: size,
    height: height,
    type: mime,
    uri: path || sourceURL,
    width: width,
});
