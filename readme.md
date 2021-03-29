### Ogólne

1. __src\helpers__ - Funkcje wspomagające implementację
2. __src\pages__ - Poszczególne strony aplikacji, ułorzenie katalogów odpowiada schematowi may palikacji. Komponenty niepowtarzające się i potrzebne do wyświetania danej strony znajdują się bezpośrednio w kalalogu danej strony.
3. __src\sharedComponents__ - Komponenty współdzielone, które są używane na różnych miejsach aplikacji.
4. __src\store__ - Redux i Local Storage.

### Translacje

znajdują się w katalogu: __I18n__


### Wświetlanie SVG

w bilbjotece: __node_modules\react-native-remote-svg__ w pliku __SvgImage.js__ zmieniono:
w linii 40: __componentWillReceiveProps__ na __UNSAFE_componentWillReceiveProps__. Jesli okaże się to problemem, przepiszę ten dodatek na hooki.