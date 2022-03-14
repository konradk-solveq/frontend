import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {number, text, boolean, radios} from '@storybook/addon-knobs';

import LayoutCenter from '@sb/utils/LayoutCenter';

import ListTileView from '@components/tiles/listTileView';

type modeT = 'public' | 'my' | 'saved' | 'featured';
const modeEnum: {
    public: modeT;
    my: modeT;
    saved: modeT;
    featured: modeT;
} = {
    public: 'public',
    my: 'my',
    saved: 'saved',
    featured: 'featured',
};

storiesOf('components/tiles/ListTileView', module)
    .addDecorator(getStory => <LayoutCenter>{getStory()}</LayoutCenter>)
    .add('Public', () => (
        <ListTileView
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imagesToDisplay={text(
                'URL images to display',
                'https://as1.ftcdn.net/v2/jpg/00/74/81/40/1000_F_74814031_3pdDZAD0tWHKEcM1k8SBRRThJwaRCZJ5.jpg',
            )}
            name={text('route name', 'nazwa trasy')}
            distanceAndTime={text('distance and time', '12km - 3h 45m')}
            distanceToStart={text('distance to start', '12km od Ciebie')}
            difficultyAndSurface={text(
                'difficulty and surface',
                'Łatwa - Szutrowa',
            )}
            checkLike={boolean('check like', false)}
            numberOfLikes={number('number of likes', 123)}
            likePressOn={() => {}}
            addToFavoritesPressOn={() => {}}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
            mode={radios('tile mode', modeEnum, modeEnum.public)}
        />
    ))
    .add('My', () => (
        <ListTileView
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imagesToDisplay={text(
                'URL images to display',
                'https://as1.ftcdn.net/v2/jpg/00/74/81/40/1000_F_74814031_3pdDZAD0tWHKEcM1k8SBRRThJwaRCZJ5.jpg',
            )}
            name={text('route name', 'nazwa trasy')}
            distanceAndTime={text('distance and time', '12km - 3h 45m')}
            distanceToStart={text('distance to start', '12km od Ciebie')}
            difficultyAndSurface={text(
                'difficulty and surface',
                'Łatwa - Szutrowa',
            )}
            checkLike={boolean('check like', false)}
            numberOfLikes={number('number of likes', 123)}
            likePressOn={() => {}}
            addToFavoritesPressOn={() => {}}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
            mode={radios('tile mode', modeEnum, modeEnum.my)}
        />
    ))
    .add('Saved', () => (
        <ListTileView
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imagesToDisplay={text(
                'URL images to display',
                'https://as1.ftcdn.net/v2/jpg/00/74/81/40/1000_F_74814031_3pdDZAD0tWHKEcM1k8SBRRThJwaRCZJ5.jpg',
            )}
            name={text(
                'route name',
                'bardzo długa nazwa trasy nie mieszcząca się w jednej linii',
            )}
            distanceAndTime={text('distance and time', '12km - 3h 45m')}
            distanceToStart={text('distance to start', '12km od Ciebie')}
            difficultyAndSurface={text(
                'difficulty and surface',
                'Łatwa - Szutrowa',
            )}
            checkLike={boolean('check like', false)}
            numberOfLikes={number('number of likes', 123)}
            likePressOn={() => {}}
            addToFavoritesPressOn={() => {}}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
            mode={radios('tile mode', modeEnum, modeEnum.saved)}
        />
    ))
    .add('Featured', () => (
        <ListTileView
            tilePressOn={() => {}}
            fullDate={text('full date', '01.01.2022')}
            imagesToDisplay={text(
                'URL images to display',
                'https://as1.ftcdn.net/v2/jpg/00/74/81/40/1000_F_74814031_3pdDZAD0tWHKEcM1k8SBRRThJwaRCZJ5.jpg',
            )}
            name={text(
                'route name',
                'bardzo długa nazwa trasy nie mieszcząca się w jednej linii',
            )}
            distanceAndTime={text('distance and time', '12km - 3h 45m')}
            distanceToStart={text('distance to start', '12km od Ciebie')}
            difficultyAndSurface={text(
                'difficulty and surface',
                'Łatwa - Szutrowa',
            )}
            checkLike={boolean('check like', false)}
            numberOfLikes={number('number of likes', 123)}
            likePressOn={() => {}}
            addToFavoritesPressOn={() => {}}
            editPressOn={() => {}}
            detailsPressOn={() => {}}
            mode={radios('tile mode', modeEnum, modeEnum.featured)}
        />
    ));
