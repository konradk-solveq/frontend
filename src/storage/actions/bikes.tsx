import {validateOrReject, ValidationError} from 'class-validator';
import {I18n} from '../../../I18n/I18n';
import * as actionTypes from './actionTypes';
import {AppThunk} from '../thunk';
import {UserBike} from '../../models/userBike.model';
import {Parameters, BikeDescription} from '../../models/bike.model';
import {Bike} from '../../models/bike.model';
import {getBikeByFrameNr} from '../../services';
import {setFrameNumber} from './index';

interface actionAsyncResponse {
    success: boolean;
    errorMessage: string;
    data: any;
}

// lista rowerów
export const getBikesData = async () => {
    const list = [
        {
            images: [],
            description: {
                name: 'Evado 2.0',
                id: 'KRTR3Z28X17W040003',
                producer: 'Kross',
                frame: '121232',
                color: 'czarny / zielony mat',
                size: ' S (17”) 26”',
                bought: {
                    date: '15-02-2019 12:00:00',
                    adress: {
                        shopName: 'All for Bike',
                        street: 'ul. 11-go Listopada 7a paw 3',
                        city: '62-510 Konin',
                        email: 'info.allforbike@gmail.com',
                        phone: '+48 665 362 280',
                        lat: 54.338890075683594,
                        lon: 18.600669860839844,
                    },
                },
                services: [
                    // najbliższe servisy w olejności od nabliższego
                    {
                        shopName: 'All for Bike',
                        street: 'ul. 11-go Listopada 7a paw 3',
                        city: '62-510 Konin',
                        email: 'info.allforbike@gmail.com',
                        phone: '+48 665 362 280',
                        lat: 54.338890075683594,
                        lon: 18.600669860839844,
                    },
                    {
                        shopName: 'All for Bike',
                        street: 'ul. 11-go Listopada 7a paw 3',
                        city: '62-510 Konin',
                        email: 'info.allforbike@gmail.com',
                        phone: '+48 665 362 280',
                        lat: 54.338890075683594,
                        lon: 18.600669860839844,
                    },
                ],
                params: [
                    {
                        name: 'Rama i widelec',
                        list: [
                            {name: 'Kaseta/wolnobieg', val: 'MATOWY'},
                            {
                                name: 'Materiał ramy',
                                val: 'ALUMINIUM PERFORMANCE',
                            },
                            {name: 'Widelec', val: 'SR SUNTOUR XCE28'},
                            {name: 'Skok widelca', val: '80MM'},
                            {name: 'Tylny amrtyzator', val: 'BRAK'},
                            {name: 'Skok tylnego amortyzatora', val: 'BRAK'},
                        ],
                    },
                    {
                        name: 'Napęd',
                        list: [
                            {
                                name: 'Przerzutka przód',
                                val: 'SHIMANO TOURNEY TY700',
                            },
                            {name: 'Przerzutka typ', val: 'SHIMANO ACERA M360'},
                            {name: 'Manetki', val: 'SHIMANO EF505'},
                            {name: 'Koronki', val: '42T-34T-24T/175MM'},
                            {name: 'Kaseta/wolnobieg', val: 'SHIMANO HG200'},
                            {name: 'Zakres kasety/wolnobieg', val: '12-32T'},
                            {name: 'Ilość przełożeń', val: '24'},
                            {name: 'Suport', val: 'FP-B902'},
                            {name: 'Łańcuch', val: 'YBN S8'},
                        ],
                    },
                    {
                        name: 'Koła',
                        list: [
                            {name: 'Pisata przód', val: 'GL-B43F-DS'},
                            {name: 'Piasta tył', val: 'GL-B43F-DS'},
                            {name: 'Obręcze', val: 'KROSS'},
                            {name: 'Opony', val: 'MITAS OCELOT V85 29X2.1'},
                        ],
                    },
                    {
                        name: 'Hamulec',
                        list: [
                            {name: 'Hamulec przód', val: 'SHIMANO MT200'},
                            {name: 'Hamulec tył', val: 'SHIMANO MT200'},
                            {name: 'Dźwignie hamulcowe', val: 'SHIMANO EF505'},
                            {name: 'Tarcze hamulcowe', val: 'DISC (160MM)'},
                        ],
                    },
                    {
                        name: 'Komponenty',
                        list: [
                            {name: 'Kierownica', val: 'ALUMINIUM 680 MM 31.8'},
                            {
                                name: 'Wspornik kierownicy',
                                val: 'ALUMINIUM 90MM/31,8/7°',
                            },
                            {name: 'Siodłlo', val: 'KROSS D5311'},
                            {
                                name: 'Wspormnik siodła',
                                val: 'ALUMINIUM 27,2X350',
                            },
                            {name: 'Stery', val: 'FP-H863 O1-1/8"'},
                            {name: 'Chwyty', val: 'KROSS HANDY'},
                            {name: 'Pedały', val: 'FP-804'},
                        ],
                    },
                    {
                        name: 'System e-bike',
                        list: [
                            {name: 'Silnik', val: 'BRAK'},
                            {name: 'Bateria', val: 'BRAK'},
                            {name: 'Bateria', val: 'BRAK'},
                        ],
                    },
                    {
                        name: 'Informacje dodatkowe',
                        list: [{name: 'Waga [kg]', val: '15'}],
                    },
                    {
                        name: 'Akcesoria',
                        list: [{name: 'Lampka', val: 'ECLIPSE LED'}],
                    },
                ],
            },
            warranty: {
                id: 'G12345566761',
                type: 'Rozszerzona',
                toEnd: 35,
                reviews: [
                    {
                        type: 'gwarancyjny',
                        date: '2020-11-30 12:00:00',
                        state: 1,
                    },
                    {
                        type: 'gwarancyjny',
                        date: '2021-03-15 12:00:00',
                        state: 0,
                    },
                    {
                        type: 'okresowy',
                        date: '2021-04-30 12:00:00',
                        state: 0,
                    },
                ],
                info:
                    'W ramach pierwszego przeglądu powinny być wykonane następujące czynności:\n\n- regulacje układu napędowego\n- dokręcenie śrub i nakrętek\n- sprawdzenie i regulacja luzów części łożyskowanych\n- sprawdzenie naciągu szprych\n- kontrola mechanizmu korbowego i elementów układu napędu\n- kontrola stanu mocowania kół\n- kontrola stanu ogumienia\n- sprawdzenie stanu hamulców i regulacja\n- sprawdzenie sprawności i skuteczności działania pozostałych podzespołów roweru',
            },
            complaintsRepairs: [
                {
                    id: '2566939992',
                    name: 'Reklamacja roweru',
                    date: '2021-03-20 12:00:00',
                    description: 'Dźwignia przerzutki - pęknięcie',
                    staus: {
                        type: 0, // stan wpływa na kolor wyświtlania, mżliwe że jest więcej niż 2 dlaego są określone przez numer
                        name: 'w takcie',
                    },
                },
                {
                    id: '102345566',
                    name: 'Reklamacja akcesorium',
                    date: '2021-03-20 12:00:00',
                    description:
                        'Niezgodność w dostawie - Uszkodzenie kartonu w dostawie w przypadku części opakowania zbiorczego.',
                    staus: {
                        type: 1,
                        name: 'zakończona',
                    },
                },
            ],
        },
    ];
    return {
        type: actionTypes.GET_BIKES_DATA,
        list: list,
    };
};

export const setBikesData = (data: Bike) => {
    return {
        type: actionTypes.SET_BIKES_DATA,
        bikeData: data,
    };
};

const setLoadingState = (state: boolean) => ({
    type: actionTypes.LOADING_BIKE_DATA_STATUS,
    state: state,
});

export const setError = (error: string) => ({
    type: actionTypes.SET_BIKES_ERROR,
    error: error,
});

export const setBikesListByFrameNumber = (
    num: string,
): AppThunk<Promise<actionAsyncResponse>> => async dispatch => {
    dispatch(setLoadingState(true));
    try {
        const response = await getBikeByFrameNr(num);

        dispatch(setFrameNumber(num));

        if (response.error || !response.data?.description) {
            dispatch(setError(response.error));

            return Promise.reject({
                success: false,
                errorMessage: response.error,
                notFound: true,
                data: null,
            });
        } else {
            /* TODO: fix class-transformer */
            // const newData = plainToClass(UserBike, response.data);

            const desc = response.data.description;
            const {name, id, sku, producer, serial_number} = desc;

            const description = new BikeDescription(
                name,
                id,
                sku,
                producer,
                serial_number,
            );
            if (desc?.color) {
                description.color = desc?.color;
            }
            if (desc?.bought) {
                description.bought = desc?.bought;
            }
            if (desc?.bought) {
                description.bought = desc?.bought;
            }
            if (desc?.colorCodes) {
                description.colorCodes = desc?.colorCodes;
            }
            if (desc?.purpose) {
                description.purpose = desc?.purpose;
            }
            if (desc?.size) {
                description.size = desc?.size;
            }
            await validateOrReject(description);

            const newData = new UserBike(description);
            if (response.data?.images) {
                newData.images = response.data?.images;
            }
            if (response.data?.params && Array.isArray(response.data.params)) {
                newData.params = response.data.params.map((el: Parameters) => {
                    return new Parameters(el.name, el.customizable, el?.list);
                });
            }
            if (response.data?.complaintsRepairs) {
                newData.complaintsRepairs = response.data?.complaintsRepairs;
            }

            dispatch(setBikesData(newData));

            return Promise.resolve({
                success: true,
                errorMessage: '',
                data: newData,
            });
        }
    } catch (error) {
        if (error?.[0] instanceof ValidationError) {
            const errorMessage = I18n.t('dataAction.validationError');
            dispatch(setError(errorMessage));

            return Promise.reject({
                success: false,
                errorMessage: errorMessage,
                data: null,
            });
        }
        const errorMessage = I18n.t('dataAction.apiError');
        dispatch(setError(errorMessage));

        return Promise.reject({
            success: false,
            errorMessage: errorMessage,
            data: null,
        });
    }
};
