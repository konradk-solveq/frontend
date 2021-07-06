import {
    NetInfoCellularGeneration,
    NetInfoStateType,
} from '@react-native-community/netinfo';

export type InternetConnectionInfoType = {
    connectionType?: NetInfoStateType;
    cellularGeneration?: NetInfoCellularGeneration;
    goodConnectionQuality?: boolean;
};
