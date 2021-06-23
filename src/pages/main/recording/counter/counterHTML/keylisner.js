addEventListener('keydown', e => {
    console.log('%c e:', 'background: #ffcc00; color: #003300', e.keyCode)

    if (e.keyCode == 81) setMini(); // q
    if (e.keyCode == 87) setMaxi(); // w
})