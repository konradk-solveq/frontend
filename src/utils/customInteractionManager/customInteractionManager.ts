import {InteractionManager} from 'react-native';
/**
 * This solution is used as workaround for https://github.com/facebook/react-native/issues/8624.
 * `runAfterInteractions` method is not always called after the Animated module is used and
 * interactions like panGesture are not cancelled.
 * Use this solution only if using native InteractionManager is causing a problem.
 */
export default {
    ...InteractionManager,
    runAfterInteractions: (f: any) => {
        let called = false;
        const timeout = setTimeout(() => {
            called = true;
            f();
        }, 500);
        return InteractionManager.runAfterInteractions(() => {
            if (called) {
                return;
            }
            clearTimeout(timeout);
            f();
        });
    },
};
