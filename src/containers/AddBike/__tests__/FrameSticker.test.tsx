import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import {FrameSticker} from '@containers/AddBike/components';

const FRAME_STICKER_TEST_ID = 'frame-sticker-id';

const TITLE = 'Bike nr';
const FRAME_NUMBER = '123456789';
const FRAME_DESCRIPTION = 'Frame: 123456789';
const ADDITIONAL_INFO = 'Size L';

describe('<FrameSticker /> - containers/Bike/containers/AddBike/components/FrameSticker', () => {
    it('Should render component with proper values', () => {
        const {getByTestId} = render(
            <FrameSticker
                title={TITLE}
                frameNumber={FRAME_NUMBER}
                frameDescription={FRAME_DESCRIPTION}
                additionalInfo={ADDITIONAL_INFO}
            />,
        );

        const title = getByTestId(`${FRAME_STICKER_TEST_ID}-title`);
        expect(title.props.children).toEqual(TITLE);

        const frameNumber = getByTestId(
            `${FRAME_STICKER_TEST_ID}-frame-number`,
        );
        expect(frameNumber.props.children).toEqual(FRAME_NUMBER);

        const drameDescription = getByTestId(
            `${FRAME_STICKER_TEST_ID}-frame-description`,
        );
        expect(drameDescription.props.children).toEqual(FRAME_DESCRIPTION);

        const additionalInfo = getByTestId(
            `${FRAME_STICKER_TEST_ID}-additional-info`,
        );
        expect(additionalInfo.props.children).toEqual(ADDITIONAL_INFO);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
