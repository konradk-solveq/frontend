import {CounterTimeT} from '@type/dateTime';
import {convertToCounterFormat, isInPast} from '../dateTime';
const mockDateToday = '2021-10-06';
const mockDateNotPast = '2021-10-07';
const mockDatePast = '2021-10-05';

describe('Converts time to desirable values -- utils', () => {
    describe('[convertToCounterFormat] - converts seconds as counter string values', () => {
        const counterStartTime = 1633504705000; //2021-10-06T07:18:25.000Z

        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(1633504705000);
        });

        it.each([
            [
                counterStartTime, //2021-10-06T07:18:25.000Z
                0,
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                undefined,
            ],
            [
                counterStartTime,
                0,
                {hoursWithMinutes: '00:02', dzSeconds: '00'},
                new Date('2021-10-06T07:16:25.000Z'),
            ],
            [
                counterStartTime,
                0,
                {hoursWithMinutes: '02:00', dzSeconds: '00'},
                new Date('2021-10-06T05:18:25.000Z'),
            ],
            [
                counterStartTime,
                0,
                {hoursWithMinutes: '02:02', dzSeconds: '04'},
                new Date('2021-10-06T05:16:21.000Z'),
            ],
            [
                counterStartTime,
                0,
                {hoursWithMinutes: '24:00', dzSeconds: '00'},
                new Date('2021-10-05T07:18:25.000Z'),
            ],
            [
                counterStartTime,
                120000,
                {hoursWithMinutes: '25:58', dzSeconds: '00'},
                new Date('2021-10-05T05:18:25.000Z'),
            ],
            [
                counterStartTime,
                240000,
                {hoursWithMinutes: '49:56', dzSeconds: '00'},
                new Date('2021-10-04T05:18:25.000Z'),
            ],
            [
                1633418305000, //past counterStartTime
                0,
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                new Date('2021-10-06T07:16:25.000Z'),
            ],
            [
                26305000, //counterStart time from now (time value euqals to 0)
                0,
                {hoursWithMinutes: '00:00', dzSeconds: '00'},
                new Date('2021-10-06T07:18:25.000Z'),
            ],
        ])(
            'Timestamp %s should be converted to counter format [%s]',
            (
                time: number,
                pauseTime: number,
                result: CounterTimeT,
                startTime?: Date,
            ) => {
                const counterTime = convertToCounterFormat(
                    time,
                    pauseTime,
                    startTime,
                );

                expect(counterTime).toEqual(result);
            },
        );

        afterEach(() => {
            jest.restoreAllMocks();
        });
    });
    describe('[isInPast] - checks if the given date has already passed', () => {
        const counterStartTime = 1633504705000; //2021-10-06T07:18:25.000Z

        beforeEach(() => {
            jest.spyOn(global.Date, 'now').mockReturnValue(counterStartTime);
        });

        it.each([
            [mockDateToday, true],
            [mockDateNotPast, false],
            [mockDatePast, true],
            [new Date(mockDateToday), true],
            [new Date(mockDateNotPast), false],
            [new Date(mockDatePast), true],
        ])(
            'Timestamp %s should return %s',
            (date: string | Date, result: boolean) => {
                expect(isInPast(date)).toEqual(result);
            },
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
