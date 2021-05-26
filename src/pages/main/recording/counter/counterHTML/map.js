let map;

const setPositionOnMap = pos => {
    map.setOptions({
        center: new google.maps.LatLng(pos.lat, pos.lng),
        zoom: 15,
    });
};

function initMap() {
    map = new google.maps.Map(googleMap, {
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain'],
        },
    });

    // const icons = {
    //     parking: {
    //         icon: "icon.png",
    //     },
    //     library: {
    //         icon: "icon2.png",
    //     },
    //     info: {
    //         icon: "icon3.png",
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
    setPositionOnMap({ lat: 53.009342618210624, lng: 20.890509251985964 });
}