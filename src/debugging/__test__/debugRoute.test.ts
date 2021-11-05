import {DebugRoute, DebugRouteInstance} from '@debugging/debugRoute';
import {RouteActionT} from '@src/type/debugRoute';
import {createDebugRouteInstance} from './utils/debugRoute';

describe('debugRoute -- debugging', () => {
    describe('[DebugRouteInstance]', () => {
        it.each([[<RouteActionT>'start'], [<RouteActionT>'rerun']])(
            'Should instantiate debugger when %s',
            async (actionType: RouteActionT) => {
                const dateToFind = '2021-11-05';
                const routeId = 'route-id';

                const debuggerInstance = createDebugRouteInstance(
                    actionType,
                    routeId,
                );

                const isDebuggerInstance =
                    debuggerInstance instanceof DebugRoute;

                expect(isDebuggerInstance).toBeTruthy();

                if (debuggerInstance) {
                    expect(debuggerInstance.routeID).toEqual(routeId);

                    expect(debuggerInstance.fileName).toContain(dateToFind);
                }
            },
        );

        describe('Keep instance', () => {
            let debuggerInstance: DebugRoute;

            beforeEach(() => {
                const instance = createDebugRouteInstance('start');

                if (instance) {
                    debuggerInstance = instance;
                }
            });

            it.each([
                [<RouteActionT>'pause'],
                [<RouteActionT>'resume'],
                [<RouteActionT>'stop'],
                [<RouteActionT>'persist'],
            ])(
                "Shouldn't create new debugger instance when %s",
                async (actionType: RouteActionT) => {
                    const newDebuggerInstance = createDebugRouteInstance(
                        actionType,
                    );

                    if (debuggerInstance && newDebuggerInstance) {
                        expect(debuggerInstance).toEqual(newDebuggerInstance);
                    }
                },
            );
        });

        it.each([[<RouteActionT>'cancelled'], [<RouteActionT>'synch']])(
            'Should clear debugger instance when %s',
            async (actionType: RouteActionT) => {
                const debuggerInstance = createDebugRouteInstance('start');

                const isDebuggerInstance =
                    debuggerInstance instanceof DebugRoute;

                expect(isDebuggerInstance).toBeTruthy();

                if (debuggerInstance) {
                    DebugRouteInstance.clearRouteDebugInstance(actionType);

                    const newDebuggerInstance = createDebugRouteInstance(
                        'start',
                    );

                    expect(debuggerInstance).not.toEqual(newDebuggerInstance);
                }
            },
        );

        afterEach(() => {
            DebugRouteInstance.clearRouteDebugInstance('cancelled');
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
