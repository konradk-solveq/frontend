interface positionBasedMapOnOffI<R1, R2> {
    getMapOff: () => R1;
    getMapOn: () => R2;
}
interface positionBasedMapOnOffAplaShowI<R1, R2, R3> {
    getMapOff: () => R1;
    getMapOn: () => R2;
    getAplaShow: () => R3;
}
interface fontBasedOnSizeI<R1, R2, R3> {
    getBig: () => R1;
    getSmall: () => R2;
    getLabel: () => R3;
}

interface positionBasedMapOnAplaShowI<R1, R2> {
    getMapOn: () => R1;
    getAplaShow: () => R2;
}

export type counterPositionsT = {
    constrainerHeight: positionBasedMapOnOffI<number, number>;
    constrainerBottom: positionBasedMapOnOffAplaShowI<number, number, number>;
    crossBtnBottom: positionBasedMapOnOffAplaShowI<number, number, number>;
    wrapHeight: positionBasedMapOnOffI<number, number>;
    wrapTop: positionBasedMapOnOffAplaShowI<number, number, number>;
    cellRowHeight: positionBasedMapOnOffI<number, number>;
    font: fontBasedOnSizeI<number, number, number>;
    findMeBottom: positionBasedMapOnAplaShowI<number, number>;
    cellWidth: positionBasedMapOnOffI<number, number>;
    cellRowLeft: positionBasedMapOnOffI<number, number>;
    cellRowTop: positionBasedMapOnOffI<number, number>;
    plugBottom: positionBasedMapOnOffI<number, number>;
};
