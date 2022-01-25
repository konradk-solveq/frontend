import {editPrivateMapMetadataService} from '@services/';
import {
    MOCK_AUTHOR,
    MOCK_DATA,
    MOCK_ERROR_400_MESSAGE,
    MOCK_ERROR_400_RESPONSE,
    MOCK_ERROR_500_DEFAULT_MESSAGE,
    MOCK_ERROR_500_MESSAGE,
    MOCK_ERROR_500_RESPONSE,
    MOCK_OK_RESPONSE,
    MOCK_SAVE_IMAGES,
    MOCK_SAVE_IMAGES_NO_FILENAMES,
} from '@services/mock/editMapData';
import {postApiCallMock} from '@utils/testUtils/apiCalls';

describe('[mapsService]', () => {
    beforeAll(() => {
        function FormDataMock() {
            this.append = jest.fn();
        }
        global.FormData = FormDataMock;
    });
    beforeEach(async () => {
        await postApiCallMock(MOCK_OK_RESPONSE, 'patch');
    });
    describe('[editPrivateMapMetadataService]', () => {
        describe('when every request succeeds', () => {
            it('should return status 200 and no error message', async () => {
                await postApiCallMock(MOCK_OK_RESPONSE);
                const result = await editPrivateMapMetadataService(
                    MOCK_DATA,
                    MOCK_AUTHOR,
                    MOCK_SAVE_IMAGES,
                );
                expect(result.status).toBe(200);
                expect(result.error).toBeFalsy();
            });
        });
        describe('when image requests return error 400', () => {
            it('should return status 400 and the returned error message', async () => {
                await postApiCallMock(MOCK_ERROR_400_RESPONSE, 'post', true);
                const result = await editPrivateMapMetadataService(
                    MOCK_DATA,
                    MOCK_AUTHOR,
                    MOCK_SAVE_IMAGES,
                );
                expect(result.status).toBe(400);
                expect(result.error).toBe(MOCK_ERROR_400_MESSAGE);
            });
        });
        describe('when image requests return error other than 400', () => {
            it('should return passed status code and translated error message', async () => {
                await postApiCallMock(MOCK_ERROR_500_RESPONSE, 'post', true);
                const result = await editPrivateMapMetadataService(
                    MOCK_DATA,
                    MOCK_AUTHOR,
                    MOCK_SAVE_IMAGES,
                );
                expect(result.status).toBe(500);
                expect(result.error).toBe(MOCK_ERROR_500_MESSAGE);
            });
        });
        describe('when image with no filename request returns error other than 400', () => {
            it('should return passed status code and default translated error message', async () => {
                await postApiCallMock(MOCK_ERROR_500_RESPONSE, 'post', true);
                const result = await editPrivateMapMetadataService(
                    MOCK_DATA,
                    MOCK_AUTHOR,
                    MOCK_SAVE_IMAGES_NO_FILENAMES,
                );
                expect(result.status).toBe(500);
                expect(result.error).toBe(MOCK_ERROR_500_DEFAULT_MESSAGE);
            });
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
});
