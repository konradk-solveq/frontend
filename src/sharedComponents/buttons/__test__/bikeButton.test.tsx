import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import BikeButton from '@sharedComponents/buttons/bikeButton';
import BikeIcon from '@sharedComponents/svg/bikeIcon';

const btnText = 'bike button';

describe('<BikeButton />', () => {
    describe('Rendering', () => {
        it('Should match snapshot', () => {
            const onClickFun = jest.fn();

            const component = render(
                <BikeButton text={btnText} onPress={onClickFun} />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with set custom button style', () => {
            const onClickFun = jest.fn();

            const component = render(
                <BikeButton
                    text={btnText}
                    onPress={onClickFun}
                    buttonStyle={{backgroundColor: 'red'}}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with set custom text style', () => {
            const onClickFun = jest.fn();

            const component = render(
                <BikeButton
                    text={btnText}
                    onPress={onClickFun}
                    textStyle={{color: 'red'}}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with icon', () => {
            const onClickFun = jest.fn();

            const component = render(
                <BikeButton
                    text={btnText}
                    onPress={onClickFun}
                    icon={<BikeIcon />}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should fire onClickEvent', async () => {
            const onClickFun = jest.fn();

            const {getByTestId} = render(
                <BikeButton text={btnText} onPress={onClickFun} />,
            );

            const likeBtn = getByTestId('bike-btn');
            fireEvent.press(likeBtn);

            expect(onClickFun).toBeCalled();
        });
    });
});
