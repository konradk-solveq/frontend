## Ogólne

1. __src\helpers__ - Funkcje wspomagające implementację
2. __src\pages__ - Poszczególne strony aplikacji, ułorzenie katalogów odpowiada schematowi may palikacji. Komponenty niepowtarzające się i potrzebne do wyświetania danej strony znajdują się bezpośrednio w kalalogu danej strony.
3. __src\sharedComponents__ - Komponenty współdzielone, które są używane na różnych miejsach aplikacji.
4. __src\store__ - Redux i Local Storage.
5. __src\naviation__ - do przekazywania navigacji.

---

## Translacje

znajdują się w katalogu: __I18n__

---

## Instalacja dependencji

```
cp .env.example .env
```

replace `API_URL` , `GOOGLE_API_KEY` and `TRANSISTORSOFT_BACKGROUND_GEOLOCATION_KEY` values

Put google-service.json in `android/app/google-services.json` path and GoogleService-Info.plist in `ios/GoogleService-Info.plist` and one for test env and rename to `ios/GoogleService-Info-Test.plist` (files comes from Firebase service).
Copy `ios/GoogleService-Info.plist` into `ios/GoogleService-Info-Prod.plist`.

Copy `google_maps_api.xml` file into `android/app/src/main/res/values`, `android/app/src/qa/res/values` and `android/app/src/dev/res/values`

---

### Private Registry

We use internal package so adding gitlab registry to npm config is must. Do the following:

```bash
npm config set @solveq:registry=https://gitlab.com/api/v4/packages/npm/
```

```bash
npm config set '//gitlab.com/api/v4/packages/npm/:_authToken' "your_token"
```

For more details read [here](https://docs.gitlab.com/ee/user/packages/npm_registry/index.html#instance-level-npm-endpoint)

and if it doesn't work:

1. close VScode (because the terminal can corrupt this process)
2. open cmd or PowerShel
2. type: `npm config edit`
3. on opened file add lines:

```txt
@solveq:registry=https://gitlab.com/api/v4/packages/npm/
//gitlab.com/api/v4/packages/npm/:_authToken=<your_token>
```

4. save changes
5. type: `npm install` - `yarn install` doest'n work
6. if installation break down remove `node_modules` form project and try 5. again

---

## FLAVORS

We can use different builds for different environments. To make it work copy `.env` file to `.env.production`, `.env.dev`, `.env.test` and `.env.feature` (if needed) files. Replace variables with proper values.
You can find scripts, to run specific build, inside `package.json` file.

`qa` flavor means `test` for Android, because `test` word is not allowed.

* ISSUES: For now different env files works only with xCode and terminal's commands. Android Studio reads only values from main env file.
* If you're using VSC and want to add support for all ven files add this to your config json file:

```JSON
"files.associations": {
    ".env.feature": "dotenv"
}
```

---

## LOGGER - SENTRY

We use Sentry for monitoring app health. To make it work add proper values in your env files. (`SENTRY_DSN` , `SENTRY_AUTH_TOKEN`)

## BackgroundGeolocation

We're using private repo. Follow these intructions [how to install](https://github.com/transistorsoft/react-native-background-geolocation-android/wiki/Migrating-your-installation-from-Public-package-to-Private-repo:)

---

## Build aplikacji

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

## Code Versioning

We use semver [semantics](https://semver.org/). Project contains package `rnsemup` for easier versioning. Just use `npx rnsemup` command in your terminal. More info [here](https://github.com/zmnv/react-native-semver-update).

---

## Deep linking

App is configured to works with deep links and universal links. All values are parameterized. To make it work edit proper variables in `.env` file.

App contains default route translation for `world` screen. It means, that deeplink which provide it will be handled and user will be navigated to `World Screen`.

* **DEEPLINKING_NAMESPACE** - deep links

    This variable is used for base deep linking. Value equal to `mykross` means that every url `mykross://custom-url/with/as-many/paths/as-needed` will be handled by the app.

    Each path (part after scheme, eg. `mykross://`) must be translated into  the appropriate screens and params (`src\navigation\linking.ts`). Without it, app will be opened, but no other action will be triggered.

* **DEEPLINKING_HOST** - universal links

    This variable is used to listen for universal links from proper domain. Let say we have url like
  this `https://example.com/world`. It will be handled by the application and proper action will be run (if defined).

  To make it work we need files `apple-app-site-association` and `assetlinks.json` to be available
  from `https://${domain}/.well-known/${file-name}`. Without this universal links won't work on IOS. On Android, our
  application will not be selected by default by the operating system to trigger an action when a link is clicked.

* **DEEPLINKING_PREFIX** - universal links

  It is connected with `DEEPLINKING_HOST`. By default the value is set to `'/'`, and it can remain as is. Though it
  could be helpful for some links.

  Imagine we have working website, `https://example.com` and we want to create some subspace for mobile app. We can
  replace `DEEPLINKING_HOST` with `'/mobile-app/'`  and from now on, each url `https://example.com/mobile-app/*` will be
  served by the app.

* **LOAD_STORYBOOK** - app mode

  It controls the mode that application boots in. Set it to `true` to enable storybook. Setting it to `false` will
  result in a normal application startup.

---

## Storybook

We use Storybook to preview the single components. The stories are defined at `./storybook/stories`. You can run the
storybook by setting the **LOAD_STORYBOOK** environment variable and running the application on the simulator. To
control the storybook from the web browser run:
- `adb reverse tcp:7007 tcp:7007`
- `npm run storybook`
- `react-native run-ios --configuration Dev.Debug --simulator`
- `react-native run-android --variant=devDebug --appIdSuffix=dev`

It will make the website available at `http://localhost:7007/`.
