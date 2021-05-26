export default `<style>
@font-face {
    font-family: 'DIN2014Narrow-Light';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Light.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Light.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Light.woff2') format('woff2'), url('DIN2014Narrow-Light.woff') format('woff'), url('DIN2014Narrow-Light.ttf') format('truetype'), url('DIN2014Narrow-Light.svg#Barlow') format('svg'), url('DIN2014Narrow-Light.otf') format('otf');
}

@font-face {
    font-family: 'DIN2014Narrow-Regular';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Regular.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Regular.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Regular.woff2') format('woff2'), url('DIN2014Narrow-Regular.woff') format('woff'), url('DIN2014Narrow-Regular.ttf') format('truetype'), url('DIN2014Narrow-Regular.svg#Barlow') format('svg'), url('DIN2014Narrow-Regular.otf') format('otf');
}

@font-face {
    font-family: 'DIN2014Narrow-Bold';
    font-style: normal;
    font-weight: 400;
    src: url('DIN2014Narrow-Bold.eot');
    src: local('open sans extralight'), local('open-sans-extralight'), url('DIN2014Narrow-Bold.eot?#iefix') format('embedded-opentype'), url('DIN2014Narrow-Bold.woff2') format('woff2'), url('DIN2014Narrow-Bold.woff') format('woff'), url('DIN2014Narrow-Bold.ttf') format('truetype'), url('DIN2014Narrow-Bold.svg#Barlow') format('svg'), url('DIN2014Narrow-Bold.otf') format('otf');
}

body {
    margin: 0;
    padding: 0;
    background-color: #ffffff;
    /* overflow: hidden; */
    background-color: #fff;
    position: relative;
    // pointer-events: none;
}

.wrap {
    margin: 0 9.6618% 0 9.6618%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: green;
}

#wrap {
    fill: yellow;
}

svg {
    margin: 0;
    padding: 0;
}

.counter {
    width: calc(50% - 7.246377%);
    padding-left: 7.246377%;
    background-color: yellow;
}

.cou-left {
    width: calc(50% - 1px);
    padding-left: 0;
    border-right: 1px solid #aaa;
}

.cou-top {
    border-bottom: 1px solid #aaa;
}

.name {
    font-family: 'DIN2014Narrow-Light';
    font-size: 23px;
    fill: #555555;
    transition: opacity .2s;
}

.hide {
    opacity: 0;
}

.show {
    opacity: 1;
}

.value {
    font-family: 'DIN2014Narrow-Regular';
    fill: #313131;
}

.unit {
    font-family: 'DIN2014Narrow-Regular';
    font-size: 18px;
    fill: #555555;
}

.mapBtn {
    cursor: pointer;
    pointer-events: initial;
}

.arrow {
    stroke: #313131;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
}

.alert {
    position: absolute;
    font-family: 'DIN2014Narrow-Regular';
    font-size: 23px;
    color: #313131;
    text-align: center;
    transition: opacity .3s;
}

#map {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}

.cover {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    pointer-events: none;
}

.test {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1999;
    font-size: 35px;
}
</style>
`