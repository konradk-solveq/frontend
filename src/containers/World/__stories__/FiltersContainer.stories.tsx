import React, {Suspense} from 'react';
import {storiesOf} from '@storybook/react-native';
import {I18nextProvider} from 'react-i18next';
import i18next from '@translations/i18next';
import {SafeAreaView} from 'react-native';
import FiltersContainer from '@containers/World/FiltersContainer';
import {boolean, array, text, object, number} from '@storybook/addon-knobs';
import {action} from '@storybook/addon-actions';
import {
    filters,
    pickedFilters,
} from '@containers/World/__mocks__/filtersContainerMocks';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const lengthOptions = ['0', '5', '10', '20', '40', '80', '120', '160', '200'];

storiesOf('containers/World/FiltersContainer', module)
    .addDecorator(getStory => (
        <I18nextProvider i18n={i18next}>
            <SafeAreaView>
                <SafeAreaProvider>
                    <Suspense fallback={null}>{getStory()}</Suspense>
                </SafeAreaProvider>
            </SafeAreaView>
        </I18nextProvider>
    ))
    .add('Default', () => (
        <FiltersContainer
            showModal={boolean('Show modal', true)}
            onClose={action('filters-close')}
            onResetHandler={action('filters-reset')}
            lengthOptions={array('Length options', lengthOptions)}
            minLength={text('Min length', lengthOptions[0])}
            maxLength={text(
                'Max length',
                lengthOptions[lengthOptions.length - 1],
            )}
            handleRangeChange={action('filters-range-change')}
            isLoop={boolean('Loop', false)}
            setIsLoop={action('filters-set-loop')}
            allowMyPublic={boolean('Allow my public', true)}
            isMyPublic={boolean('My public', false)}
            setIsMyPublic={action('filters-set-my-public')}
            onSaveHandler={action('filters-save')}
            isDirty={boolean('Dirty', false)}
            itemsCount={number('Items count', 1)}
            filters={object('Filters', filters)}
            pickedFilters={object('Picked filters', pickedFilters)}
            onSaveFiltersHandler={action('filters-save-filters')}
        />
    ));
