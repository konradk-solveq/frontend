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
const customJsonStringify = (value, fallback) => {
    if (!value) {
        return value;
    }

    try {
        return JSON.stringify(value);
    } catch (error) {
        return fallback || undefined;
    }
};

let map;
const googleMap = document.getElementById('map');
// let pos = { latitude: 53.009342618210624, longitude: 20.890509251985964 };

let my_location = null;
const setMyLocation = (position, hideMarker) => {
    let latLng = position ? new google.maps.LatLng(position.latitude, position.longitude) : null;
    if (map) {
        if (!hideMarker){
            if (my_location) {
                my_location.setPosition(latLng);
            } else {
                my_location = new google.maps.Marker({
                    id: 'my_location',
                    position: latLng,
                    icon: 'my_location.png',
                    map: map,
                });
            }
        } else {
             if (my_location) {
                my_location.setMap(null);
                my_location=null;
            }
        }
    }

}

// dodawanie punktów po zmianie regionu
let marks = {};
let clusterShops = null;
let clusterService = null;
let clusterServiceShops = null;
let clickedMarker = {};
const setPosOnMap = position => {
    let latLng = new google.maps.LatLng(position.latitude, position.longitude);
    
    map.setOptions({
        center: latLng,
    });
}

const getRgion = () => {
    const bounds = map.getBounds();
    window.ReactNativeWebView.postMessage("changeRegion#$#"+customJsonStringify(bounds, ''));
}

function initMap() {
    map = new google.maps.Map(googleMap, {
        mapTypeId: 'roadmap',
        mapId: googleMapId,
        disableDefaultUI: true,
        zoom: 13,
        minZoom: 6,
        draggable: true,
        scrollwheel: true,
        disableDoubleClickZoom: false,
    });

    setPosOnMap(pos)

    // dla chowania apli z adresem
    map.addListener('click', () => {
        window.ReactNativeWebView.postMessage("clickMap");
        if (clickedMarker.element) resetMarkerSize(clickedMarker);
    });

    // dla zmiany pozycji regionu
    map.addListener('dragend', getRgion);
    map.addListener('zoom_changed', getRgion);
    setTimeout(() => {
        getRgion();
    }, 1500);

    clusterShops = new MarkerClusterer(map, marks.shop, {
        ignoreHidden: false,
        tracksViewChanges: true,
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
        ignoreHidden: false,
        tracksViewChanges: true,
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
        tracksViewChanges: true,
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


const setMarks = places => {
    for (let p of places) {
        if(!p){
            continue;
        }

        let id = p.details.name.replace(/[.s]/g, '_');
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

        if(!mark){
            continue;
        }

        marks[type].push(mark);

        // do pokazywania alpi z adresem
        google.maps.event.addDomListener(mark, 'click', function() {
            // null-safty (optional chaining) operator causes silent error on Android 9 devices

            if (clickedMarker.element) resetMarkerSize(clickedMarker);

            if(mark && mark.details){
                window.ReactNativeWebView.postMessage("clickMarker#$#"+customJsonStringify(mark.details, ''));
                mark.setIcon({ url: type + '_marker.png', scaledSize: new google.maps.Size(60, 60)});
                clickedMarker.element = mark;
                clickedMarker.type = type;
            }
        });

        switch (type) {
            case 'shop': { clusterShops.addMarkers([mark]); }; break;
            case 'service': { clusterService.addMarkers([mark]); }; break;
            case 'serviceshop': { clusterServiceShops.addMarkers([mark]); }; break;
        }
    }
}

const resetMarkerSize = marker => {
    marker.element.setIcon({ url: marker.type + '_marker.png' , scaledSize: new google.maps.Size(44, 44)});
    clickedMarker = {};
}

const setShops = visibility => {
    marks.shop.forEach(e => e.setVisible(visibility));

    if (visibility) {
        clusterShops = new MarkerClusterer(map, marks.shop, {
            ignoreHidden: false,
            tracksViewChanges: true,
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
    } else {
        clusterShops.clearMarkers();
    }
}

const setServices = visibility => {
    marks.service.forEach(e => e.setVisible(visibility));

    if (visibility) {
        clusterService = new MarkerClusterer(map, marks.service, {
            ignoreHidden: false,
            tracksViewChanges: true,
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
    } else {
        clusterService.clearMarkers();
    }
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>

`;
