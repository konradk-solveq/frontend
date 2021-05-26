addEventListener('keydown', e => {
    console.log('%c e:', 'background: #ffcc00; color: #003300', e.keyCode)

    if (e.keyCode == 81) setMini();
    if (e.keyCode == 87) setMaxi();
})