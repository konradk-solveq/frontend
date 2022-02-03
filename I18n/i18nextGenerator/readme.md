to run generator write at console:
```npm run i18ng```

---

or if you want to fill empty variables at translation with some phrase then type:
```set VAL=__no translation__& npm run i18ng```
and for PowerShell
```
$env:VAL="__no translation__"
npm run i18ng
```
where on `__no translation__` type phrase to fill

---

after that new file `en.json` will show at `I18n\i18nextGenerator\output`

if we want to use other translations, we can replace them on `I18n\i18nextGenerator\generator.js`
on line 6 and 7 are defined loaded files: `MODEL_FILE` and `FILE_TO_COMPLETE`

on line 93 running mixed functions the firs argument is modeled one and second is to be completed