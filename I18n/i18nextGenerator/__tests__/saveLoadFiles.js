const ff = require('./../saveLoadFiles');

describe('Loading and saving files for generator', () => {
    describe('Loading file', () => {
        it('Should load the file', async () => {
            const file = ff.load('pl.json');
            expect(file && typeof file === 'object').toBe(true);
        });
        it('Should not load the file', async () => {
            const file = ff.load('no_file.json');
            expect(file).toBeNull();
        });
    });

    describe('Save file', () => {
        it('Should save and load saved file', async () => {
            ff.save('test', {test: 'test'});
            const file = ff.load('i18nextGenerator/output/test.json');
            expect(file && typeof file === 'object').toBe(true);
        });
    });
});
