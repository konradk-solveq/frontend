import initStoryshots, {
    multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';

jest.useFakeTimers('modern');
jest.setSystemTime(new Date('2022-03-29T01:00:00.000Z'));

/**
 * we need to mock useAnimatedProps manually, because it's missing from the provided mock
 * when generating the storyshots
 */
const Reanimated = require('react-native-reanimated/mock');
Reanimated.useAnimatedProps = jest.fn();

initStoryshots({
    framework: 'react-native',
    test: multiSnapshotWithOptions({}),
});
