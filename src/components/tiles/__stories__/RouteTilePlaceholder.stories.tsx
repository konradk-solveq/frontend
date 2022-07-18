import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {text} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import RouteTilePlaceholder from '@src/components/tiles/RouteTilePlaceholder';

storiesOf('components/tiles/RouteTilePlaceholder', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('No Data available', () => (
        <RouteTilePlaceholder
            isDataNotComplete={true}
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            name={text('route name', 'Trasa testowa')}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
        />
    ))
    .add('Route image available', () => (
        <RouteTilePlaceholder
            isDataNotComplete={true}
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imageUrl={text(
                'URL image to display',
                'https://as1.ftcdn.net/v2/jpg/02/65/42/54/1000_F_265425492_PhSiiKoD3CnX9KwVuGDvYsBJuSLoyflE.jpg',
            )}
            name={text('route name', 'Trasa testowa')}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
        />
    ))
    .add('Route details available', () => (
        <RouteTilePlaceholder
            isDataNotComplete={false}
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imageUrl={text('URL image to display', '')}
            name={text('route name', 'Trasa testowa')}
            distanceAndTime={text('distance and time', '55km - 3h 44m')}
            distanceToStart={text('distance to start', '3')}
            difficultyAndSurface={text(
                'difficulty and surface',
                'Trudna - Szutrowa',
            )}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
        />
    ));
