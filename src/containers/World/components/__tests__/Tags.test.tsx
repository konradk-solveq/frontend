import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import options from '@api/mocks/configData';

import {Tags} from '@containers/World/components';

const optionsData = options.tags;

const TAGS = [...optionsData].map(o => o.enumValue);
const TAGS_VALUES = [...optionsData].map(o => o.i18nValue);
const TAGS_ELEMENT_TEST_ID = 'tags-world-test-id-tags-element';

describe('<Tags /> - containers/World/components/Tags', () => {
    it('Should render tags when data has been passed', () => {
        const {getAllByTestId} = render(
            <Tags tags={TAGS} options={optionsData} />,
        );

        const tagsListElement = getAllByTestId(TAGS_ELEMENT_TEST_ID);
        expect(tagsListElement.length).toEqual(TAGS.length);

        tagsListElement.forEach(te => {
            const renderedTag = te.props.children.props.children;
            expect(TAGS_VALUES).toContain(renderedTag);
        });
    });

    it('Should not render tags when passed options are "udnefined"', () => {
        const {queryAllByTestId} = render(
            <Tags tags={TAGS} options={undefined} />,
        );

        const tagsListElement = queryAllByTestId(TAGS_ELEMENT_TEST_ID);
        expect(tagsListElement.length).toEqual(0);
    });

    it('Should not render tags when option for tag is missing', () => {
        const optionsDat = [optionsData[0], optionsData[1], optionsData[5]];
        const {getAllByTestId} = render(
            <Tags tags={TAGS} options={optionsDat} />,
        );

        const tagsListElement = getAllByTestId(TAGS_ELEMENT_TEST_ID);
        expect(tagsListElement.length).toEqual(optionsDat.length);

        tagsListElement.forEach(te => {
            const renderedTag = te.props.children.props.children;
            expect(TAGS_VALUES).toContain(renderedTag);
        });
    });

    it('Should not render tags data is an empty array', () => {
        const {queryAllByTestId} = render(
            <Tags tags={[]} options={optionsData} />,
        );

        const tagsListElement = queryAllByTestId(TAGS_ELEMENT_TEST_ID);
        expect(tagsListElement.length).toEqual(0);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
