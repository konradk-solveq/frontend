import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {initAppSize} from '@helpers/layoutFoo';

import Like from '../like';

const customSize = 22;

describe('<Like />', () => {
    describe('Rendering', () => {
        beforeAll(() => {
            initAppSize();
        });

        it('Should match snapshot - unchecked', async () => {
            const onClickFun = jest.fn();

            const component = await render(
                <Like gaved={false} onpress={onClickFun} />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - checked', async () => {
            const onClickFun = jest.fn();

            const component = await render(
                <Like gaved={true} onpress={onClickFun} />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should match snapshot - with custom size - unchecked', async () => {
            const onClickFun = jest.fn();

            const component = await render(
                <Like
                    gaved={false}
                    onpress={onClickFun}
                    iconSize={customSize}
                />,
            );
            expect(component).toMatchSnapshot();
        });

        it('Should fire onClickEvent', async () => {
            const onClickFun = jest.fn();

            const {getByTestId} = await render(
                <Like
                    gaved={false}
                    onpress={onClickFun}
                    iconSize={customSize}
                />,
            );

            const likeBtn = getByTestId('like-btn');
            fireEvent.press(likeBtn);

            expect(onClickFun).toBeCalled();
        });
    });
});
