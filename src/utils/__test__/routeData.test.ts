import {
    appendDataToFile,
    createRootDir,
    generalDeviceInfo,
    getISODateString,
    removeFile,
} from '../debugging/routeData';

describe('routeData -- utils', () => {
    describe('[getISODateString]', () => {
        it('Should returns ISO date string', () => {
            const expectedDate = '2021-11-04T13:00:26.831Z';
            jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(
                expectedDate,
            );

            const ISODateString = getISODateString();

            expect(ISODateString).toEqual(expectedDate);
        });
    });

    describe('On files operations', () => {
        it('[createRootDir] - should create directory', async () => {
            const result = await createRootDir();

            expect(result).toEqual(undefined);
        });

        it('[removeFile] - should remove file', async () => {
            const result = await removeFile('fileToRemove');

            expect(result).toEqual(undefined);
        });

        describe('[appendDataToFile]', () => {
            it.each([
                ['content'],
                [{data: 'content1', data2: 'content2'}],
                [{data: 'content1', data2: {d: 'content', d2: 'content2'}}],
                [['content1', 'content2', 'content3']],
                [undefined],
                [null],
            ])(
                'Should write content: %s to file if data is not empty',
                async (content: any) => {
                    const result = await appendDataToFile(
                        'fileToModify',
                        content,
                    );

                    if (content) {
                        if (typeof content === 'string') {
                            expect(result).toEqual(content);
                        } else {
                            expect(result).toEqual(JSON.stringify(content));
                        }
                    } else {
                        expect(result).toEqual(undefined);
                    }
                },
            );

            it.each([
                ['content', true, undefined, undefined],
                ['content', false, undefined, undefined],
                ['content', true, 'start', undefined],
                ['content', false, 'start', undefined],
                ['content', true, undefined, 'end'],
                ['content', false, undefined, 'end'],
                ['content', true, 'start', 'end'],
                ['content', false, 'start', 'end'],
            ])(
                'Should write content: %s to file with coma, prefix or|and suffix if required. Comma: %s, prefix: %s, suffix: %s',
                async (
                    content: string,
                    withComma: boolean,
                    prefix?: string,
                    suffix?: string,
                ) => {
                    const result = await appendDataToFile(
                        'fileToModify',
                        content,
                        withComma,
                        prefix,
                        suffix,
                    );

                    if (withComma) {
                        expect(result).toContain(',');
                    } else {
                        expect(result).not.toContain(',');
                    }

                    if (prefix) {
                        expect(result).toContain(prefix);
                    } else {
                        expect(result).not.toContain(prefix);
                    }

                    if (suffix) {
                        expect(result).toContain(suffix);
                    } else {
                        expect(result).not.toContain(suffix);
                    }
                },
            );
        });

        it("[generalDeviceInfo] - should return info about user's devide", async () => {
            const result = generalDeviceInfo();

            expect(result).toEqual({
                airplaneMode: false,
                appUsedMemory: -1,
                baseOS: 'unknown',
                deviceMemory: -1,
                freeDiskStorage: -1,
                locationProviders: {},
                powerState: {},
            });
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });
});
