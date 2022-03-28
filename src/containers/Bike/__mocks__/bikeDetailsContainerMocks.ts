import {Bike} from '@models/bike.model';

export const bike: Bike = {
    description: {
        name: 'LEVEL 6.0 2018',
        id: null,
        sku: 'KRLV6Z29X19M140003',
        producer: 'Kross',
        serial_number: '1003737005',
        colorCodes: ['#030303', '#FFFFFF', '#FF0000'],
        color: 'czarny / biały / czerwony mat',
        size: '29"',
        purpose: {code: 'off-road', name: 'wyczynowy'},
    },
    images: [
        'https://kross.eu/media/cache/gallery/images/31/31551/level_6_0_black_white_red_matte.png',
    ],
    params: [
        {
            name: 'Rama i widelec',
            customizable: false,
            list: [{name: 'WYKOŃCZENIE LAKIERU', value: 'matowy'}],
        },
        {
            name: 'Napęd',
            customizable: false,
            list: [
                {name: 'KORBY', value: 'SR Suntour XCM (38/24T)'},
                {name: 'KASETA/WOLNOBIEG', value: 'Shimano CS-HG50 (11-36T)'},
            ],
        },
        {
            name: 'Hamulce',
            customizable: false,
            list: [
                {
                    name: 'HAMULEC PRZÓD',
                    value:
                        'Shimano BR-M365 (tarczowy, hydrauliczny, tarcza: 27,5  : 160mm / 29  : S/M/L - 160mm, XL - 180mm)',
                },
                {
                    name: 'HAMULEC TYŁ',
                    value: 'Shimano Disc BR-M365 (tarczowy, hydrauliczny)',
                },
            ],
        },
        {
            name: 'Komponenty',
            customizable: false,
            list: [{name: 'CHWYTY', value: 'KROSS SCALE'}],
        },
    ],
    warranty: {
        id: 'TEST',
        end: new Date('2025-04-01'),
        type: 'no-info',
        info: 'brak informacji',
        overviews: [
            {
                date: new Date('2022-04-01'),
                type: 'pre-season',
                info: 'przed sezonem',
                operations: [
                    'regulacje układu napędowego, czyszczenie łańcucha i zębatek oraz ich nasmarowanie',
                    'kontrola ogumienia, ogólnego stanu kół oraz odpowiedniego ciśnienia w kołach',
                    'sprawdzenie stanu hamulców i ich regulacja, sprawdzenie działania dźwigni i okładzin ściernych bądź klocków. W przypadku hamulców tarczowych odtłuszczenie tarczy',
                    'kontrola stabilności roweru i podzespołów, tzw. regulacja luzów',
                    'sprawdzenie poprawności działania widelca (jeśli jest amortyzowany)',
                    'ogólne sprawdzenie stanu roweru, pęknięć oraz innych uszkodzeń na podzespołach bądź ramie roweru',
                    'w przypadku jazdy po drogach publicznych - sprawdzenie oraz uzupełnienie niezbędnego wyposażenia, którego wymagają przepisy ruchu drogowego – odblaski, dzwonek, oświetlenie',
                ],
                style: {color: '#FFFFFF', dashed: true, checkmark: false},
            },
            {
                date: new Date('2022-10-31'),
                type: 'post-season',
                info: 'po sezonie',
                operations: [
                    'mycie roweru. Najskuteczniejszym sposobem jest użycie specjalistycznych środków do czyszczenia',
                    'sprawdzenie układu napędowego, łańcucha oraz konserwacja całego układu',
                    'kontrola ogumienia, ogólnego stanu kół oraz odpowiedniego ciśnienia w kołach',
                    'ogólne sprawdzenie stanu roweru, pęknięć oraz innych uszkodzeń na podzespołach bądź ramie roweru',
                ],
                style: {color: '#FFFFFF', dashed: true, checkmark: false},
            },
        ],
    },
    complaintsRepairs: [],
};
