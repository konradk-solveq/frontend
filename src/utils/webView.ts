import {BasicCoordsType} from '@type/coords';

export const getMapInitLocation = (location?: BasicCoordsType) => {
    return location
        ? `<script>let pos={latitude: ${location.latitude}, longitude: ${location.longitude}}</script>`
        : '<script>let pos={ latitude: 53.009342618210624, longitude: 20.890509251985964 }</script>';
};
