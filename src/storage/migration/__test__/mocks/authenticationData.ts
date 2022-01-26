export const authDataMock = {
    _persist: {rehydrated: true, version: -1},
    deviceToken: 'U8cEQGzkixBN4INmeSLj9ZHZGu3aZTUIKjl5-1tGUX1XLFon2dP7yl7NP1jH',
    recoveryCodes: ['444970', '060519', '205219', '033079', '402100'],
    sessionData: {
        access_token: 'CH0sFW2HrKwyJUl46X8SSwnI7MBzLGXHP6KA',
        refresh_token: 'PaOCgHjbNl4USJW-lG7Im2N-jr5nlEvtPluI',
        expiration_date: '2022-01-15T11:12:32.618Z',
        expires_in: 2591999,
        user: {
            id: '2Vzc7qN2S1mvpDQwlWSVxh4y',
            email:
                'dbDJU7tyV03KkHd4wa0fDPrQW4-bH7eQxNWdCu2yWSoCgTNb@mobile-user',
            role: 'notRegistered',
        },
    },
    userId: '2Vzc7qN2S1mvpDQwlWSVxh4y',
};

export const emptyAuthSessionDataMock = {
    access_token: '',
    refresh_token: '',
    expiration_date: '',
    expires_in: null,
    user: {
        id: '',
        email: '',
        role: 'notRegistered',
    },
};
