import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default `
<style>
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

#map {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.cluster div {
    top: 6px;
}
</style>

<div id="map"></div>

<script src="https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js"></script>

<script>
let map;
const googleMap = document.getElementById('map');
let pos = { latitude: 53.009342618210624, longitude: 20.890509251985964 };

const setPosOnMap = position => {
    let latLng = new google.maps.LatLng(position.latitude, position.longitude);

    map.setOptions({
        center: latLng,
    });
}
const getRgion = () => {
    const bounds = map.getBounds();

    window.ReactNativeWebView.postMessage("changeRegion#$#"+JSON.stringify(bounds));
}

function initMap() {
    map = new google.maps.Map(googleMap, {
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        zoom: 13,
        minZoom: 6,
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
        styles: [{
                featureType: 'all',
                elementType: 'geometry.fill',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'all',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'all',
                elementType: 'labels.text',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#313131' }],
            },
            {
                featureType: 'administrative',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'landscape',
                elementType: 'all',
                stylers: [{ color: '#897171' }, { visibility: 'off' }],
            },
            {
                featureType: 'landscape.man_made',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f4e5e6' }, { visibility: 'on' }],
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry.fill',
                stylers: [{ color: '#f9eeee' }, { visibility: 'on' }],
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.attraction',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.business',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.government',
                elementType: 'geometry',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.medical',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.park',
                elementType: 'all',
                stylers: [
                    { color: '#9ed28d' },
                    { saturation: '19' },
                    { lightness: '-16' },
                ],
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.place_of_worship',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.school',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.sports_complex',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'poi.sports_complex',
                elementType: 'geometry',
                stylers: [{ color: '#c7c7c7' }, { visibility: 'off' }],
            },
            {
                featureType: 'road',
                elementType: 'all',
                stylers: [
                    { color: '#313131' },
                    { visibility: 'on' },
                    { weight: '0.30' },
                ],
            },
            {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }, { color: '#391f1f' }],
            },
            {
                featureType: 'road',
                elementType: 'labels.text',
                stylers: [{ visibility: 'on' }, { color: '#313131' }],
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#313131' }],
            },
            {
                featureType: 'road.highway',
                elementType: 'all',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#ffffff' }, { visibility: 'simplified' }],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }, { color: '#313131' }],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                    { visibility: 'on' },
                    { color: '#313131' },
                    { weight: '1' },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [{ color: '#ffffff' }, { visibility: 'off' }],
            },
            {
                featureType: 'road.arterial',
                elementType: 'all',
                stylers: [{ visibility: 'simplified' }, { color: '#ffffff' }],
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{ visibility: 'simplified' }],
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.text',
                stylers: [{ color: '#717171' }, { visibility: 'off' }],
            },
            {
                featureType: 'road.local',
                elementType: 'all',
                stylers: [{ color: '#ffffff' }, { visibility: 'on' }],
            },
            {
                featureType: 'road.local',
                elementType: 'geometry',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text',
                stylers: [{ color: '#313131' }, { visibility: 'off' }],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#313131' }],
            },
            {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{ visibility: 'off' }, { color: '#ff0000' }],
            },
            {
                featureType: 'water',
                elementType: 'all',
                stylers: [{ color: '#84bde9' }],
            },
        ],
    });

    setPosOnMap(pos)

    // dla chowania apli z adresem
    map.addListener('click', () => {
        window.ReactNativeWebView.postMessage("clickMap");
    });

    // dla zmiany pozycji regionu
    map.addListener('dragend', getRgion);
    map.addListener('zoom_changed', getRgion);
    setTimeout(() => {
        getRgion();
    }, 500);

}

// dodawanie punktów po zmianie regionu
let marks = {};
let clusterShops = null;
let clusterService = null;
let clusterServiceShops = null;

const setMarks = places => {
    for (let p of places) {
        let id = p.details.name.replace(/[\.\s]/g, '_');
        let type = p.markerTypes.join('');
        if (typeof marks[type] == 'undefined') marks[type] = [];
        if (marks[type].some(e => e.id == id)) continue;

        let mark = new google.maps.Marker({
            id,
            position: new google.maps.LatLng(p.lat, p.lng),
            icon: type + '_marker.png',
            map: map,
            details: p.details,
        });

        marks[type].push(mark);

        // do pokazywania alpi z adresem
        google.maps.event.addDomListener(mark, 'click', function() {
            window.ReactNativeWebView.postMessage("clickMarker#$#"+JSON.stringify(mark.details));
        });
    }

    clusterShops = new MarkerClusterer(map, marks.shop, {
        ignoreHidden: true,
        styles: [{
                url: "shop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "shop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "shop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "shop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "shop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
        ]
    });

    clusterService = new MarkerClusterer(map, marks.service, {
        ignoreHidden: true,
        styles: [{
                url: "service_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "service_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "service_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "service_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "service_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
        ]
    });

    clusterServiceShops = new MarkerClusterer(map, marks.serviceshop, {
        ignoreHidden: true,
        styles: [{
                url: "serviceshop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "serviceshop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "serviceshop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "serviceshop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
            {
                url: "serviceshop_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 30,
                textColor: "#fff",
                width: 44,
                height: 44,
                anchor:[22,22],
            },
        ]
    });
}

const setShops = visibility => {
    marks.shop.forEach(e => e.setVisible(visibility));
    clusterShops.repaint();
}

const setServices = visibility => {
    marks.service.forEach(e => e.setVisible(visibility));
    clusterService.repaint();
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>

`;
