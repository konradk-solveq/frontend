import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as actionTypes from '../actions/actionTypes';
import {UserBike} from '../../models/userBike.model';

interface BikesState {
  list: any[];
  userBike: UserBike;
}

const initialStateList: BikesState = {
    list: [
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
                    date: '2019-02-15 12:00:00',
                    adress: {
                        shopName: 'All for Bike',
                        street: 'ul. 11-go Listopada 7a paw 3',
                        city: '62-510 Konin',
                        email: 'info.allforbike@gmail.com',
                        phone: '+48 665 362 280',
                        lat: 54.338890075683594,
                        lon: 18.600669860839844
                    }
                }
            },
            services: [ // najbliższe servisy w olejności od nabliższego
                {
                    shopName: 'All for Bike',
                    street: 'ul. 11-go Listopada 7a paw 3',
                    city: '62-510 Konin',
                    email: 'info.allforbike@gmail.com',
                    phone: '+48 665 362 280',
                    lat: 54.338890075683594,
                    lon: 18.600669860839844
                },
                {
                    shopName: 'All for Bike',
                    street: 'ul. 11-go Listopada 7a paw 3',
                    city: '62-510 Konin',
                    email: 'info.allforbike@gmail.com',
                    phone: '+48 665 362 280',
                    lat: 54.338890075683594,
                    lon: 18.600669860839844
                }
            ],
            params: [
                {
                    name: 'Rama i widelec',
                    list: [
                        { name: 'Wykończenie lakieru', value: 'MATOWY' },
                        { name: 'Materiał ramy', value: 'ALUMINIUM PERFORMANCE' },
                        { name: 'Widelec', value: 'SR SUNTOUR XCE28' },
                        { name: 'Skok widelca', value: '80MM' },
                        { name: 'Tylny amrtyzator', value: 'BRAK' },
                        { name: 'Skok tylnego amortyzatora', value: 'BRAK' },
                    ]
                },
                {
                    name: 'Napęd',
                    list: [
                        { name: 'Przerzutka przód', value: 'SHIMANO TOURNEY TY700' },
                        { name: 'Przerzutka typ', value: 'SHIMANO ACERA M360' },
                        { name: 'Manetki', value: 'SHIMANO EF505' },
                        { name: 'Koronki', value: '42T-34T-24T/175MM' },
                        { name: 'Kaseta/wolnobieg', value: 'SHIMANO HG200' },
                        { name: 'Zakres kasety/wolnobieg', value: '12-32T' },
                        { name: 'Ilość przełożeń', value: '24' },
                        { name: 'Suport', value: 'FP-B902' },
                        { name: 'Łańcuch', value: 'YBN S8' }
                    ]
                },
                {
                    name: 'Koła',
                    list: [
                        { name: 'Pisata przód', value: 'GL-B43F-DS' },
                        { name: 'Piasta tył', value: 'GL-B43F-DS' },
                        { name: 'Obręcze', value: 'KROSS' },
                        { name: 'Opony', value: 'MITAS OCELOT V85 29X2.1' }
                    ]
                },
                {
                    name: 'Hamulec',
                    list: [
                        { name: 'Hamulec przód', value: 'SHIMANO MT200' },
                        { name: 'Hamulec tył', value: 'SHIMANO MT200' },
                        { name: 'Dźwignie hamulcowe', value: 'SHIMANO EF505' },
                        { name: 'Tarcze hamulcowe', value: 'DISC (160MM)' }
                    ]
                },
                {
                    name: 'Komponenty',
                    list: [
                        { name: 'Kierownica', value: 'ALUMINIUM 680 MM 31.8' },
                        { name: 'Wspornik kierownicy', value: 'ALUMINIUM 90MM/31,8/7°' },
                        { name: 'Siodłlo', value: 'KROSS D5311' },
                        { name: 'Wspormnik siodła', value: 'ALUMINIUM 27,2X350' },
                        { name: 'Stery', value: 'FP-H863 O1-1/8"' },
                        { name: 'Chwyty', value: 'KROSS HANDY' },
                        { name: 'Pedały', value: 'FP-804' }
                    ]
                },
                {
                    name: 'System e-bike',
                    list: [
                        { name: 'Silnik', value: 'BRAK' },
                        { name: 'Bateria', value: 'BRAK' },
                        { name: 'Bateria', value: 'BRAK' }
                    ]
                },
                {
                    name: 'Informacje dodatkowe',
                    list: [
                        { name: 'Waga [kg]', value: '15' }
                    ]
                },
                {
                    name: 'Akcesoria',
                    list: [
                        { name: 'Lampka', value: 'ECLIPSE LED' }
                    ]
                },
            ],
            warranty: {
                id: 'G12345566761',
                type: "Rozszerzona",
                toEnd: 35,
                end: "2021-03-15 12:00:00",
                reviews: [
                    {
                        type: 'gwarancyjny',
                        date: '2020-11-30 12:00:00',
                        state: 1
                    },
                    {
                        type: 'gwarancyjny',
                        date: '2021-03-15 12:00:00',
                        state: 0
                    },
                    {
                        type: 'okresowy',
                        date: '2021-04-30 12:00:00',
                        state: 0
                    },
                ],
                info: 'W ramach pierwszego przeglądu powinny być wykonane następujące czynności:\n\n- regulacje układu napędowego\n- dokręcenie śrub i nakrętek\n- sprawdzenie i regulacja luzów części łożyskowanych\n- sprawdzenie naciągu szprych\n- kontrola mechanizmu korbowego i elementów układu napędu\n- kontrola stanu mocowania kół\n- kontrola stanu ogumienia\n- sprawdzenie stanu hamulców i regulacja\n- sprawdzenie sprawności i skuteczności działania pozostałych podzespołów roweru'
            },
            complaintsRepairs: [
                {
                    id: '2566939992',
                    name: 'Reklamacja roweru',
                    date: '2021-03-20 12:00:00',
                    description: 'Dźwignia przerzutki - pęknięcie',
                    state: {
                        type: 0, // stan wpływa na kolor wyświtlania, mżliwe że jest więcej niż 2 dlaego są określone przez numer
                        name: 'w takcie'
                    }
                },
                {
                    id: '102345566',
                    name: 'Reklamacja akcesorium',
                    date: '2021-03-20 12:00:00',
                    description: 'Niezgodność w dostawie - Uszkodzenie kartonu w dostawie w przypadku części opakowania zbiorczego.',
                    state: {
                        type: 1,
                        name: 'zakończona'
                    }
                },
                {
                    id: '102345566',
                    name: 'Reklamacja akcesorium',
                    date: '2021-03-20 12:00:00',
                    description: 'Niezgodność w dostawie - Uszkodzenie kartonu w dostawie w przypadku części opakowania zbiorczego.\nbardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo bardzo długi opis',
                    state: {
                        type: 1,
                        name: 'zakończona'
                    }
                }
            ]
        }
    ],
  userBike: {
    frameNumber: '',
    producer: '',
    model: '',
    size: '',
    color: '',
  },
};

const bikesReducer = (state = initialStateList, action: any) => {
    switch (action.type) {
        case actionTypes.GET_BIKES_DATA: {
            return {
                ...state,
                list: action.list,
            }
        }
        case actionTypes.SET_BIKES_DATA: {
            return {
                ...state,
                list: action.list,
            }
        }
    case actionTypes.SET_USER_BIKE: {
      return {
        ...state,
        userBike: action.userBike,
      };
    }
    }

    return state;
};

const persistConfig = {
  key: 'bikes',
  storage: AsyncStorage,
  whitelist: ['userBike'],
};

export default persistReducer(persistConfig, bikesReducer);
