### Ogólne

1. __src\helpers__ - Funkcje wspomagające implementację
2. __src\pages__ - Poszczególne strony aplikacji, ułorzenie katalogów odpowiada schematowi may palikacji. Komponenty niepowtarzające się i potrzebne do wyświetania danej strony znajdują się bezpośrednio w kalalogu danej strony.
3. __src\sharedComponents__ - Komponenty współdzielone, które są używane na różnych miejsach aplikacji.
4. __src\store__ - Redux i Local Storage.

### Translacje

znajdują się w katalogu: __I18n__


### Wświetlanie SVG

w bilbjotece: __node_modules\react-native-remote-svg__ w pliku __SvgImage.js__ zmieniono:
w linii 40: __componentWillReceiveProps__ na __UNSAFE_componentWillReceiveProps__. Jesli okaże się to problemem, przepiszę tą bibjotekę na hooki.


### Instalacja dependencji

gdyby nie zadziałało:
```html
yarn install
```

to:
```html
react-native init kross_app --variant=0.59.9 
yarn add -D typescript @types/jest @types/react @types/react-native @types/react-test-renderer
yarn add @react-native-async-storage/async-storage
yarn add @react-native-community/masked-view
yarn add @react-navigation/native
yarn add @react-navigation/stack
yarn add axios
yarn add react-devtools
yarn add react-native-gesture-handler
yarn add react-native-hyperlink
yarn add react-native-i18n
yarn add react-native-reanimated
yarn add react-native-remote-svg
yarn add react-native-safe-area-context
yarn add react-native-safe-area-view
yarn add react-native-screens
yarn add react-native-svg
yarn add react-native-webview
yarn add react-redux
yarn add redux
```


### Build aplikacji

gdyby nie zadziałało:
```html
./android
gradlew assembleRelease
```

to:
```html
gradlew clean
gradlew app:assembleRelease -x lintVitalRelease
```

gdyby okazało się, że coś nie działa to usunąć w __android/app/build.gradle__:
```html
    lintOptions {
        disable 'InvalidPackage'
        checkReleaseBuilds false
    }
```