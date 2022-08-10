import {
    GeneralDeviceT,
    RouteActionT,
    RouteAdditionalInfoT,
} from '@type/debugRoute';
import {CurrentRouteI} from '@storage/reducers/routes';

import {LocationDataI, PathApiRequestBodyI} from '@interfaces/geolocation';

export interface DebugRouteI {
    readonly routeID: string;
    readonly fileName: string;
    readonly deviceGeneralInfo: GeneralDeviceT;

    writeRouteDataIntoDebugFile: (
        actionType: RouteActionT,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
        dataToSynch?: LocationDataI[],
        dataSendToServer?: PathApiRequestBodyI,
    ) => void;
}
