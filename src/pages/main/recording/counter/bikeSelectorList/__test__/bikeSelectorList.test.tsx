import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import BikeSelectorList from '@pages/main/bike/bikeSelectorList/bikeSelectorList';
import {initAppSize} from '@helpers/layoutFoo';

import {bikesListData} from './mocks/bikesListData';

const btnText = '+ Add';
const bikeBtnTestID = 'bike-btn';
const addBikeBtnTestID = 'add-bike-btn';
const iconTestID = 'bike-icon';
const mockedDataList = bikesListData();

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({navigate: mockedNavigate}),
}));

describe('<BikeSelectorList />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot', () => {
            const onPressFun = jest.fn();

            const component = render(
                <BikeSelectorList
                    list={[]}
                    callback={onPressFun}
                    buttonText={btnText}
                    currentBike=""
                />,
            );

            expect(component).toMatchSnapshot();

            const addBikeBtn = component.queryByTestId(addBikeBtnTestID);
            expect(addBikeBtn).not.toBeNull();
        });

        it('Should render bike button', () => {
            const onPressFun = jest.fn();

            const component = render(
                <BikeSelectorList
                    list={[mockedDataList[0]]}
                    callback={onPressFun}
                    buttonText={btnText}
                    currentBike=""
                />,
            );

            expect(component).toMatchSnapshot();

            const addBikeBtn = component.queryByTestId(addBikeBtnTestID);
            expect(addBikeBtn).not.toBeNull();

            const icon = component.queryByTestId(iconTestID);
            expect(icon).toBeNull();
        });

        it('Should render bike button with icon', () => {
            const onPressFun = jest.fn();

            const component = render(
                <BikeSelectorList
                    list={[mockedDataList[0]]}
                    callback={onPressFun}
                    buttonText={btnText}
                    currentBike={mockedDataList[0].description.serial_number}
                />,
            );

            expect(component).toMatchSnapshot();

            const addBikeBtn = component.queryByTestId(addBikeBtnTestID);
            expect(addBikeBtn).not.toBeNull();

            const icon = component.getByTestId(iconTestID);
            expect(icon).not.toBeNull();
        });

        it('Should fire onPress', () => {
            const onPressFun = jest.fn();

            const component = render(
                <BikeSelectorList
                    list={[mockedDataList[0]]}
                    callback={onPressFun}
                    buttonText={btnText}
                    currentBike={mockedDataList[0].description.serial_number}
                />,
            );

            expect(component).toMatchSnapshot();

            const bikeBtn = component.getByTestId(bikeBtnTestID);
            fireEvent.press(bikeBtn);

            expect(onPressFun).toBeCalled();
        });

        describe('chosen bike with icon', () => {
            it.each([
                [mockedDataList[0].description.serial_number],
                [mockedDataList[1].description.serial_number],
                [mockedDataList[2].description.serial_number],
            ])(
                'Should add icon for picked bike - serial_number: %s',
                (pickedBike: string) => {
                    const onPressFun = jest.fn();

                    const component = render(
                        <BikeSelectorList
                            list={mockedDataList}
                            callback={onPressFun}
                            buttonText={btnText}
                            currentBike={pickedBike}
                        />,
                    );

                    expect(component).toMatchSnapshot();

                    const icon = component.getByTestId(iconTestID);
                    expect(icon).not.toBeNull();

                    const allBikeIcons = component.queryAllByTestId(iconTestID);
                    expect(allBikeIcons.length).toEqual(1);
                },
            );
        });
    });
});
