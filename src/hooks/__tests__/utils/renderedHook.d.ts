import {
    RenderResult,
    WaitForNextUpdate,
    WaitForValueToChange,
} from '@testing-library/react-hooks';
import {DataI} from '../../useLocalizationTracker';

export type renderHookType = {
    result: RenderResult<{
        trackerData: DataI | undefined;
        lastDistance: number;
        isActive: boolean;
        pauseTracker: () => Promise<void>;
        resumeTracker: () => Promise<void>;
        startTracker: (
            keep?: boolean,
            routeIdToFollow?: string,
        ) => Promise<void>;
        stopTracker: (omitPersist?: boolean | undefined) => Promise<void>;
        averageSpeed: number | undefined;
        followedRouteId: string;
        setCurrentTrackerData: () => void;
    }>;
    waitForNextUpdate: WaitForNextUpdate;
    waitForValueToChange: WaitForValueToChange;
} | null;
