import {CounterTimeT} from '@type/dateTime';
import {convertToCounterFormat} from '../dateTime';

describe('Converts time to desirable values -- utils', () => {
    describe('[convertToCounterFormat] - converts seconds as counter string values', () => {
        const counterStartTime = 1633504705000; //2021-10-06T07:18:25.000Z

        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(1633504705000);
        });

        it.each([
            [
                counterStartTime, //2021-10-06T07:18:25.000Z
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                undefined,
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '00:02', dzSeconds: '00'},
                new Date('2021-10-06T07:16:25.000Z'),
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '02:00', dzSeconds: '00'},
                new Date('2021-10-06T05:18:25.000Z'),
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '02:02', dzSeconds: '04'},
                new Date('2021-10-06T05:16:21.000Z'),
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '24:00', dzSeconds: '00'},
                new Date('2021-10-05T07:18:25.000Z'),
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '26:00', dzSeconds: '00'},
                new Date('2021-10-05T05:18:25.000Z'),
            ],
            [
                counterStartTime,
                {hoursWithMinutes: '50:00', dzSeconds: '00'},
                new Date('2021-10-04T05:18:25.000Z'),
            ],
            [
                1633418305000, //past counterStartTime
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                new Date('2021-10-06T07:16:25.000Z'),
            ],
            [
                26305000, //counterStart time from now (time value euqals to 0)
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                new Date('2021-10-06T07:18:25.000Z'),
            ],
        ])(
            'Timestamp %s should be converted to counter format',
            (time: number, result: CounterTimeT, startTime?: Date) => {
                const counterTime = convertToCounterFormat(time, startTime);

                expect(counterTime).toEqual(result);
            },
        );

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
});
