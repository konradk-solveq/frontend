import {ApiPathI, LocationDataI} from '@interfaces/geolocation';
import {DebugRouteI} from '@interfaces/debugRoute';
import {
    ConnectionStateT,
    GeneralDeviceT,
    RouteActionT,
    RouteAdditionalInfoT,
} from '@type/debugRoute';

import {CurrentRouteI} from '@storage/reducers/routes';
import {
    appendDataToFile,
    createRootDir,
    generalDeviceInfo,
    getISODateString,
    removeFile,
} from '@utils/debugging/routeData';

export class DebugRoute implements DebugRouteI {
    private _routeID: string;
    private _fileName: string;
    private _deviceGeneralInfo: GeneralDeviceT;

    constructor(routeID: string, createdAt?: Date) {
        this._routeID = routeID;

        this._deviceGeneralInfo = this._getGeneralDeviceInfo();
        this._fileName = this._createFileName(createdAt);

        createRootDir();
    }

    set routeID(name: string) {
        this._routeID = name;
    }

    get routeID() {
        return this._routeID;
    }

    set fileName(name: string) {
        this._fileName = name;
    }

    get fileName() {
        return this._fileName;
    }

    set deviceGeneralInfo(info: GeneralDeviceT) {
        this._deviceGeneralInfo = info;
    }

    public set connectionState(cState: ConnectionStateT) {
        this._deviceGeneralInfo.connectionState = cState;
    }

    private _writeStartRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
                routeAdditionalInfo,
            },
            true,
            '[',
        );
    };

    private _writeRerunRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
                routeAdditionalInfo,
            },
            true,
            '',
        );
    };

    private _writePauseRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
            },
            true,
            '',
        );
    };

    private _writeResumeRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
            },
            true,
            '',
        );
    };

    private _writeStopRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
                routeAdditionalInfo,
            },
            true,
        );
    };

    private _writePersistRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
        dataToSynch?: LocationDataI[],
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        await appendDataToFile(
            this._fileName,
            {
                actionType,
                actionDateTime,
                ...deviceInfo,
                routeData,
                routeAdditionalInfo,
                dataToSynch,
            },
            true,
        );
    };

    private _writeSynchRouteData = async (
        actionType: RouteActionT,
        actionDateTime: string,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
        dataToSynch?: LocationDataI[],
        dataSendToServer?: ApiPathI[],
    ) => {
        const deviceInfo = {deviceGeneralInfo: this._deviceGeneralInfo};
        const dataToWrite: any = {
            actionType,
            actionDateTime,
            ...deviceInfo,
            routeData,
            routeAdditionalInfo,
        };
        if (dataToSynch) {
            dataToWrite.dataToSynch = dataToSynch;
        }
        if (dataSendToServer) {
            dataToWrite.dataSendToServer = dataSendToServer;
        }
        await appendDataToFile(this._fileName, dataToWrite, false, '', ']');
    };

    private _removeFileOnCancelRoute = async () => {
        await removeFile(this._fileName);
    };

    public writeRouteDataIntoDebugFile = async (
        actionType: RouteActionT,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
        dataToSynch?: LocationDataI[],
        dataSendToServer?: ApiPathI[],
    ) => {
        const actionDateTime = getISODateString();

        switch (actionType) {
            case 'start':
                await this._writeStartRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                );
                break;
            case 'rerun':
                await this._writeRerunRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                );
                break;
            case 'pause':
                await this._writePauseRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                );
                break;
            case 'resume':
                await this._writeResumeRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                );
                break;
            case 'stop':
                await this._writeStopRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                );
                break;
            case 'persist':
                await this._writePersistRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                    dataToSynch,
                );
                break;
            case 'synch':
                await this._writeSynchRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                    dataToSynch,
                    dataSendToServer,
                );
                break;
            case 'cancelled':
                await this._removeFileOnCancelRoute();
                break;
        }
    };

    private _createFileName = (createdAt?: Date) => {
        let fileN = `Route - ${this._routeID}`;
        try {
            let suffix = '';

            if (createdAt) {
                const withoutMilliseconds = createdAt.toISOString().split('.');
                const reg = new RegExp(':', 'g');
                const dToTitle = withoutMilliseconds[0].replace(reg, '-');

                suffix = `- createdAt - ${dToTitle} `;
            }

            fileN = `Route ${suffix}- ${this._routeID}`;
        } catch (error) {
            console.error('[=== DEBUG ROUTE - _createFileName ===]', error);
        } finally {
            return fileN;
        }
    };

    private _getGeneralDeviceInfo = () => {
        return generalDeviceInfo();
    };
}

export class DebugRouteInstance {
    private static _routeDebugger: DebugRoute | undefined;

    static debugRouteInstance = (
        actionType: RouteActionT,
        routeId: string,
        startedAt?: Date,
    ) => {
        if (
            (actionType === 'start' || actionType === 'rerun') &&
            !this._routeDebugger
        ) {
            this._routeDebugger = new DebugRoute(routeId, startedAt);
        }

        return this._routeDebugger;
    };

    static clearRouteDebugInstance = (actionType: RouteActionT) => {
        if (
            (actionType === 'cancelled' || actionType === 'synch') &&
            this._routeDebugger
        ) {
            this._routeDebugger = undefined;
        }
    };
}
