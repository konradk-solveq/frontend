import {RecordTimeAction} from '@interfaces/geolocation';
import {getTimeInUTCSeconds} from '@src/utils/transformData';
import {getRecordTimesFromDatesWhenEmpty} from '@storage/actions/utils/routes';

const MOCKED_TIME = new Date('2021-10-06T07:18:25.000Z'); //2021-10-06T07:18:25.000Z
const MOCKED_RECORD_TIMES_RESULT = [
    {action: 'start', time: 1633504705},
    {action: 'end', time: 1633504705},
];

describe('[routes -- storage/actions/utils]', () => {
    describe('[getRecordTimesFromDatesWhenEmpty()]', () => {
        beforeEach(() => {
            const mockDate = new Date(MOCKED_TIME);
            jest.spyOn(global, 'Date').mockImplementation(
                () => (mockDate as unknown) as string,
            );
        });

        it('When "recordTimes" are ampty and "dates" are "undefined" should return object with newly created dates', async () => {
            const recordTimes = getRecordTimesFromDatesWhenEmpty(
                [],
                [undefined, undefined],
            );

            expect(recordTimes).toEqual(MOCKED_RECORD_TIMES_RESULT);
        });

        it('When "recordTimes" are ampty and "dates" contains correct values should return object with passed dates', async () => {
            const startDate = new Date('2022-09-01T07:18:25.000Z');
            const endDate = new Date('2022-09-01T08:18:25.000Z');
            const recordTimes = getRecordTimesFromDatesWhenEmpty(
                [],
                [startDate, endDate],
            );

            expect(recordTimes[0].time).toEqual(
                getTimeInUTCSeconds(startDate.toISOString()),
            );
            expect(recordTimes[1].time).toEqual(
                getTimeInUTCSeconds(endDate.toISOString()),
            );
        });

        it('When "recordTimes" contains values and "dates" contains correct values should return object with "recordTimes', async () => {
            const recordStartDate = new Date('2022-09-01T05:18:25.000Z'); //1633504705
            const recordEndDate = new Date('2022-09-01T06:18:25.000Z'); //1633504705
            const startDate = new Date('2022-09-01T07:18:25.000Z');
            const endDate = new Date('2022-09-01T08:18:25.000Z');
            const recordTimes = getRecordTimesFromDatesWhenEmpty(
                [
                    {action: RecordTimeAction.START, time: 1633504705},
                    {action: RecordTimeAction.END, time: 1633504705},
                ],
                [startDate, endDate],
            );

            expect(recordTimes[0].time).toEqual(
                getTimeInUTCSeconds(recordStartDate.toISOString()),
            );
            expect(recordTimes[1].time).toEqual(
                getTimeInUTCSeconds(recordEndDate.toISOString()),
            );
        });

        it('When "recordTimes" contains values and "dates" are "undefined" should return object with "recordTimes', async () => {
            const recordStartDate = new Date('2022-09-01T05:18:25.000Z'); //1633504705
            const recordEndDate = new Date('2022-09-01T06:18:25.000Z'); //1633504705
            const recordTimes = getRecordTimesFromDatesWhenEmpty(
                [
                    {action: RecordTimeAction.START, time: 1633504705},
                    {action: RecordTimeAction.END, time: 1633504705},
                ],
                [undefined, undefined],
            );

            expect(recordTimes[0].time).toEqual(
                getTimeInUTCSeconds(recordStartDate.toISOString()),
            );
            expect(recordTimes[1].time).toEqual(
                getTimeInUTCSeconds(recordEndDate.toISOString()),
            );
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
