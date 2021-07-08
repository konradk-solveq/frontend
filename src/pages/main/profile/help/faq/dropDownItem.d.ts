import * as React from 'react';

interface IProps {
    contentVisible: boolean;
    header: any;
    backgroundColor: string;
    titleBackground: string;
    contentBackground: string;
    underlineColor: string;
    visibleImage: any;
    invisibleImage: any;
}

declare class DropDownItem extends React.Component<IProps, any> {}

export default DropDownItem;

// na podstawie:
//https://reactnativeexample.com/simple-drop-down-item-component-for-react-native/