import initStoryshots, {
    multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

jest.useFakeTimers('modern');
jest.setSystemTime(new Date('2022-03-29T01:00:00.000Z'));

initStoryshots({
    framework: 'react-native',
    test: multiSnapshotWithOptions({}),
});
