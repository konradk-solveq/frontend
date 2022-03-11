import initStoryshots, {
    multiSnapshotWithOptions,
} from '@storybook/addon-storyshots';
initStoryshots({
    framework: 'react-native',
    test: multiSnapshotWithOptions({}),
});
