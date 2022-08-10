import {LocationDataI, PathApiRequestBodyI} from '@interfaces/geolocation';
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
    getDateIOSStringAsTitle,
    getISODateString,
    removeFile,
    writeGeolocationLogsToFileToFile,
} from '@utils/debugging/routeData';

export class DebugRoute implements DebugRouteI {
    private _routeID: string;
    private _fileName: string;
    private _deviceGeneralInfo: GeneralDeviceT;

    private _gpsLogWritten = false;

    constructor(routeID: string, createdAt?: Date) {
        this._routeID = routeID;

        this._deviceGeneralInfo = this._getGeneralDeviceInfo();
        this._fileName = this._createFileName(routeID, createdAt);

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
        dataSendToServer?: PathApiRequestBodyI,
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

    private _writeNoSynchRouteData = async (
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
            false,
            undefined,
            ']',
        );
    };

    private _removeFileOnCancelRoute = async () => {
        await removeFile(this._fileName);
    };

    public writeRouteDataIntoDebugFile = async (
        actionType: RouteActionT,
        routeData: CurrentRouteI,
        routeAdditionalInfo: RouteAdditionalInfoT,
        dataToSynch?: LocationDataI[],
        dataSendToServer?: PathApiRequestBodyI,
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

                await writeGeolocationLogsToFileToFile(this._fileName, {
                    start: routeData.startedAt,
                    end: routeData.endedAt,
                });
                this._gpsLogWritten = true;
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
            case 'no-synch':
                await this._writeNoSynchRouteData(
                    actionType,
                    actionDateTime,
                    routeData,
                    routeAdditionalInfo,
                );

                if (!this._gpsLogWritten) {
                    await writeGeolocationLogsToFileToFile(this._fileName, {
                        start: routeData.startedAt,
                        end: routeData.endedAt,
                    });
                }
                break;
            case 'cancel':
                await this._removeFileOnCancelRoute();
                break;
        }
    };

    private _createFileName = (routeID: string, createdAt?: Date) => {
        let fileN = `Route - ${routeID}`;
        try {
            let suffix = '';

            if (createdAt) {
                const dToTitle = getDateIOSStringAsTitle(createdAt);

                suffix = `- createdAt - ${dToTitle} `;
            }

            fileN = `Route ${suffix}- ${routeID}`;
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

    static debugRouteInstance = async (
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

        /**
         * Try to recreate directory if doesn't exists
         */
        await createRootDir();

        return this._routeDebugger;
    };

    static clearRouteDebugInstance = (actionType: RouteActionT) => {
        if (
            (actionType === 'cancel' ||
                actionType === 'synch' ||
                actionType === 'no-synch') &&
            this._routeDebugger
        ) {
            this._routeDebugger = undefined;
        }
    };
}
