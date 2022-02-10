import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import SmallWhiteBtn from '@sharedComponents/buttons/SmallWhiteBtn';

const btnText = 'bike button';

describe('<SmallWhiteBtn />', () => {
    describe('Rendering', () => {
        it('Should match snapshot', () => {
            const onClickFun = jest.fn();

            const component = render(
                <SmallWhiteBtn title={btnText} onPress={onClickFun} />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with set custom button style', () => {
            const onClickFun = jest.fn();

            const component = render(
                <SmallWhiteBtn
                    title={btnText}
                    onPress={onClickFun}
                    style={{backgroundColor: 'red'}}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with set custom text style', () => {
            const onClickFun = jest.fn();

            const component = render(
                <SmallWhiteBtn
                    title={btnText}
                    onPress={onClickFun}
                    textStyle={{color: 'red'}}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should fire onClickEvent', async () => {
            const onClickFun = jest.fn();

            const {getByTestId} = render(
                <SmallWhiteBtn title={btnText} onPress={onClickFun} />,
            );

            const likeBtn = getByTestId('small-white-btn');
            fireEvent.press(likeBtn);

            expect(onClickFun).toBeCalled();
        });
    });
});
