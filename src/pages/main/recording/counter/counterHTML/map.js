let map;
let markerMe;

const setPositionOnMap = pos => {
    let latLng = new google.maps.LatLng(pos.lat, pos.lng);
    map.setOptions({
        center: latLng,
        zoom: 15,
        // mapTypeId: "satellite",
        heading: 90,
        tilt: 45,

    });

    map.setTilt(45);

    // googleMap.style.setProperty('transform', 'rotate(45deg)');

    markerMe.setOptions({
        position: latLng,
        // rotation: 90,
    });
    // markerMe.style.setProperty('transform', 'rotate(-45deg)');
};

function initMap() {
    map = new google.maps.Map(googleMap, {
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        mapTypeId: 'satellite',
        mapTypeControlOptions: {
            // style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        },
        zoom: 15,
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

    markerMe = new google.maps.Marker({
        // position: latLang,
        icon: 'me.png',
        map: map,
    });

    // const icons = {
    //     me: {
    //         icon: "me.png",
    //     },
    // };

    // const features = [{
    //     position: new google.maps.LatLng(-33.91721, 151.2263),
    //     type: "info",
    // }, {
    //     position: new google.maps.LatLng(-33.91539, 151.2282),
    //     type: "info",
    // }, ];

    // // Create markers.
    // for (let i = 0; i < features.length; i++) {
    //     const marker = new google.maps.Marker({
    //         position: features[i].position,
    //         icon: icons[features[i].type].icon,
    //         map: map,
    //     });
    // }

    mapOn.push(() => {
        map.setOptions({
            draggable: true,
            zoomControl: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
        });
    });
    mapOff.push(() => {
        map.setOptions({
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
        });
    });

    // window.ReactNativeWebView.postMessage("map is ready");
    setPositionOnMap({
        lat: 53.009342618210624,
        lng: 20.890509251985964,
        heading: 45,
    });
}