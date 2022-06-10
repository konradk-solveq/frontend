import {BasicCoordsType} from '@type/coords';
import {defaultLocation} from '@utils/constants/location';

export const getMapInitLocation = (location?: BasicCoordsType) => {
    return location
        ? `<script>let pos={latitude: ${location.latitude}, longitude: ${location.longitude}}</script>`
        : `<script>let pos=${JSON.stringify(defaultLocation)}</script>`;
};
