export const activateKeepAwake = () => jest.fn();
export const deactivateKeepAwake = () => jest.fn();

const keepAwake = {
    activate: jest.fn(),
    deactivate: jest.fn(),
};

export default keepAwake;
