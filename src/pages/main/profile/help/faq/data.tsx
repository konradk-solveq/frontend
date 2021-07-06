const data = [
    {
        question: 'Czym jest myKROSS?',
        answer: 'myKross to darmowa aplikacja dla wszystkich pasjonatów jazdy rowerem. Dostępna na urządzeniach mobilnych z systemem Android oraz iOS. myKross pozwala na wyświetlenie posiadanego roweru do listy rowerów, monitorowaniu przeglądów oraz informowaniu o najbliższych punktach serwisowych lub sklepach rekomendowanych przez Kross.   Obecnie funkcjonuje na telefonach z systemem Android w wersji 5.0 i IOS 13.0 lub nowszej.',
    },
    {
        question: 'Jak mogę pobrać aplikację myKROSS na telefon?',
        answer: 'Nasza aplikacja jest dostępna na urządzenia z systemem Android oraz iOS. Bezpośrednie linki do pobrania aplikacji znajdziesz tutaj: https://play.google.com/store/apps/details?id=pl.kross.mykross i https://apps.apple.com/pl/app/mykross/id1561981216.',
    },
    {
        question: 'Jak się zarejestrować do aplikacji myKROSS?',
        answer: 'W  chwili obecnej aplikacja nie zawiera opcji rejestracji konta. Użytkownik może posługiwać się dowolnym nickiem (imię lub pseudonim) lub może pominąć ten krok.',
    },
    {
        question: 'Czy mogę przystąpić do myKROSS bez użycia telefonu?',
        answer: 'Nie, myKROSS to aplikacja mobilna i korzystanie z niej jest możliwe wyłącznie przy użyciu smartfona z dostępem do internetu.',
    },
    {
        question: 'Jak zarejestrować rower w aplikacji?',
        answer: 'W tej wersji aplikacji istnieje możliwość wyświetlenia informacji o rowerze i  odbywa się poprzez dodanie roweru do listy rowerów. Rower można dodać skanując naklejkę NFC, którą znajdziesz na ramie roweru KROSS lub wprowadzając numer roweru ręcznie.',
    },
    {
        question: 'Jak włączyć NFC w telefonie?',
        answer: 'Aby włączyć NFC w telefonie, należy zsunąć z góry pasek powiadomień i rozwinąć jego kolejne funkcje. Jeśli nie znajdziemy tam szukanej pozycji, powinniśmy wejść w "Ustawienia" i w polu "Łączność"/ "Połączenia"/ "Udostępnianie" odszukać opcję "połączenia NFC".',
    },
    {
        question:
            'Mój telefon nie posiada NFC czy mimo to mogę korzystać z  myKROSS?',
        answer: 'Tak, do korzystania z myKROSS nie potrzebujesz telefonu z NFC. NFC służy do szybszego dodawania rowerów Kross. Jeśli nie posiadasz w ustawieniach NFC możesz dodać ręcznie swój rower.',
    },
    {
        question:
            'Czy mogę korzystać z aplikacji myKROSS jeśli nie posiadam roweru marki Kross?',
        answer: 'Aplikacja myKROSS dostępna jest dla wszystkich pasjonatów rowerów. Jeśli posiadasz rower innego producenta dodaj go ręcznie do aplikacji. Dzięki temu zyskasz informacje o przeglądach okresowych oraz o najbliższych punktach serwisowych lub sklepach rekomendowanych przez KROSS.',
    },
    {
        question: 'Jak włączyć lokalizację w telefonie?',
        answer: 'Aby włączyć lokalizację w telefonie, należy zsunąć z góry pasek powiadomień i rozwinąć jego kolejne funkcje. Jeśli nie znajdziemy tam szukanej pozycji, powinniśmy wejść w "Ustawienia" i w polu "Prywatnośc"/ "Zaawansowane" odszukać opcję "Lokalizacja".',
    },
    {
        question: 'Czy aplikacja wymaga lokalizacji?',
        answer: 'Brak udzielenia zgody na lokalizację ogranicza korzystanie z funkcji szukania najbliższego punktu serwisowego lub sklepu rowerowego rekomendowanego przez KROSS.',
    },
    {
        question: 'Co kryje się pod nazwą Rowerowa Mapa Polski?',
        answer: 'Obecnie trwają prace nad zakładką, ale już dziś możemy zdradzić, że Rowerowa Mapa to jedna z głównych atrakcji aplikacji  myKROSS. Aplikacja będzie umożliwiać nagrywanie własnych tras rowerowych, publikowanie ich na mapie, aby te z kolei mogły służyć jako inspiracja dla innych rowerzystów.',
    },
    {
        question:
            'Posiadam konto na stronie https://kross.eu/. Czy na te dane mogę się zalogować do aplikacji?',
        answer: 'W chwili obecnej nie ma opcji rejestracji i logowania w aplikacji. W kolejnych etapach rozwoju  gdy zostanie stworzony profil Użytkownika nastąpi integracja z kontami założonymi na stronie https://kross.eu/.',
    },
    {
        question: 'Czy przez aplikację mogę zrobić zakupy?',
        answer: 'myKROSS obecnie nie jest zintegrowane ze sklepem https://kross.eu/. Zakup produktów odbywa się wyłącznie kanałami elektronicznymi na stronie internetowej.',
    },
    {
        question: 'Czy aplikacja zbiera cookies?',
        answer: 'Obecnie aplikacja nie używa plików cookies. Więcej informacji na ten temat znajduje się w Polityka Prywatności Aplikacji Mobilnej myKROSS.',
    },
    {
        question: 'Jakie dane przetwarza aplikacja  myKROSS?',
        answer: 'Aplikacja przetwarza  następujące dane: nick (podany przez użytkownika) - opcjonalnie, numer ramy roweru, nazwę producenta roweru, model roweru, kolor roweru. W przypadku rowerów Kross dodatkowo są to szczegółowe dane roweru wg specyfikacji roweru, terminy przeglądów roweru. Jeśli w ustawieniach telefonu zostanie włączona lokalizacja, również lokalizacja będzie przetwarzana. Więcej informacji na ten temat znajduje się w Polityka Prywatności Aplikacji Mobilnej myKROSS.',
    },
];

const links = [
    {
        url: 'https://play.google.com/store/apps/details?id=pl.kross.mykross',
        hyper: 'Aplikacja myKROSS - Android',
    },
    {
        url: 'https://apps.apple.com/pl/app/mykross/id1561981216',
        hyper: 'Aplikacja myKROSS - iOS',
    },
];

data.forEach(element => {
    links.forEach(e => element.answer.replace(e.hyper, e.url));
});

export default data;
