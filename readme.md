### Ogólne

1. __src\helpers__ - Funkcje wspomagające implementację
2. __src\pages__ - Poszczególne strony aplikacji, ułorzenie katalogów odpowiada schematowi may palikacji. Komponenty niepowtarzające się i potrzebne do wyświetania danej strony znajdują się bezpośrednio w kalalogu danej strony.
3. __src\sharedComponents__ - Komponenty współdzielone, które są używane na różnych miejsach aplikacji.
4. __src\store__ - Redux i Local Storage.
5. __src\naviation__ - do przekazywania navigacji.


### Translacje

znajdują się w katalogu: __I18n__


### Instalacja dependencji

```
cp .env.example .env
```
replace `API_URL` , `GOOGLE_API_KEY` and `TRANSISTORSOFT_BACKGROUND_GEOLOCATION_KEY` values

Put google-service.json in `android/app/google-services.json` path and GoogleService-Info.plist in `ios/GoogleService-Info.plist` (files comes from Firebase service).

#### BackgroundGeolocation

We're using private repo. Follow these intructions [how to install](https://github.com/transistorsoft/react-native-background-geolocation-android/wiki/Migrating-your-installation-from-Public-package-to-Private-repo:)

---

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
yarn add @react-native-community/netinfo
yarn add @react-native-firebase
yarn add @react-native-firebase/app
yarn add @react-native-firebase/crashlytics
yarn add @react-navigation/bottom-tabs
yarn add @react-navigation/native
yarn add @react-navigation/stack
yarn add axios
yarn add class-transformer
yarn add class-validator
yarn add fetch
yarn add react-devtools
yarn add react-native-android-location-enabler
yarn add react-native-background-fetch
yarn add react-native-background-geolocation
yarn add react-native-config
yarn add react-native-device-info
yarn add react-native-dotenv
yarn add react-native-gesture-handler
yarn add react-native-get-location
yarn add react-native-hyperlink
yarn add react-native-i18n
yarn add react-native-keyboard-aware-scroll-view
yarn add react-native-maps
yarn add react-native-nfc-manager
yarn add react-native-permissions
yarn add react-native-reanimated
yarn add react-native-safe-area-context
yarn add react-native-safe-area-view
yarn add react-native-screens
yarn add react-native-svg
yarn add react-native-swiper
yarn add react-native-webview
yarn add react-redux
yarn add redux
yarn add redux-persist
yarn add redux-thunk
yarn add babel-plugin-transform-remove-console --dev
yarn add babel-plugin-root-import --dev
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
