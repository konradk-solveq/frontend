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

let my_location = null;
const setMyLocation = position => {
    let latLng = new google.maps.LatLng(position.latitude, position.longitude);

    if (map) {
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
    }
}

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
        styles: [
            {
                featureType: 'administrative.country',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text',
                stylers: [
                    {
                        color: '#555555',
                    },
                ],
            },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'landscape.man_made',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#F9EEEE',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'landscape.natural.landcover',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#F9EEEE',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'poi.attraction',
                stylers: [
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'poi.attraction',
                elementType: 'labels.icon',
                stylers: [
                    {
                        color: '#D8232A',
                    },
                ],
            },
            {
                featureType: 'poi.attraction',
                elementType: 'labels.text',
                stylers: [
                    {
                        color: '#555555',
                    },
                ],
            },
            {
                featureType: 'poi.attraction',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.business',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.government',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.medical',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.park',
                stylers: [
                    {
                        color: '#9ED28D',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'poi.park',
                elementType: 'labels',
                stylers: [
                    {
                        color: '#313131',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.place_of_worship',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.school',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'poi.sports_complex',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.arterial',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#FFFFFF',
                    },
                    {
                        saturation: '0',
                    },
                    {
                        visibility: 'on',
                    },
                    {
                        weight: '4.00',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    {
                        color: '#313131',
                    },
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels',
                stylers: [
                    {
                        color: '#313131',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'labels',
                stylers: [
                    {
                        color: '#313131',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text',
                stylers: [
                    {
                        color: '#313131',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        color: '#313131',
                    },
                    {
                        visibility: 'simplified',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [
                    {
                        color: '#555555',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'labels.text',
                stylers: [
                    {
                        color: '#555555',
                    },
                ],
            },
            {
                featureType: 'transit',
                elementType: 'labels.text.fill',
                stylers: [
                    {
                        visibility: 'off',
                    },
                ],
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry.fill',
                stylers: [
                    {
                        color: '#D6D6D6',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'transit.station.rail',
                elementType: 'labels.icon',
                stylers: [
                    {
                        color: '#555555',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
            {
                featureType: 'water',
                stylers: [
                    {
                        color: '#84BDE9',
                    },
                    {
                        visibility: 'on',
                    },
                ],
            },
        ],
    });

    setPosOnMap(pos)

    // dla chowania apli z adresem
    map.addListener('click', () => {
        window.ReactNativeWebView.postMessage("clickMap");
        marks.forEach(m => {
            m.setOptions({
                icon: 'map_route_marker.png',
            });
        })
    });

    // dla zmiany pozycji regionu
    map.addListener('dragend', getRgion);
    map.addListener('zoom_changed', getRgion);
    setTimeout(() => {
        getRgion();
    }, 1500);
}

// dodawanie punktów po zmianie regionu
let marks = [];
let clusterPublic = null;

const setMarks = places => {
    for (let p of places) {
        let id = p.details.id;
        if (marks.some(e => e.id == id)) continue;

        let mark = new google.maps.Marker({
            id,
            position: new google.maps.LatLng(p.lat, p.lng),
            icon: 'map_route_marker.png',
            map: map,
            details: p.details,
            markerTypes: [...p.markerTypes]
        });

        marks.push(mark);
        window.ReactNativeWebView.postMessage("clickMarkerToAdd#$#"+JSON.stringify(mark.markerTypes));
        // do pokazywania alpi z adresem
        google.maps.event.addDomListener(mark, 'click', function() {
            window.ReactNativeWebView.postMessage("clickMarker#$#"+JSON.stringify(mark.details));
            marks.forEach(m => {
                m.setOptions({
                    icon: 'map_route_marker.png',
                });
            })
            mark.setOptions({
                icon: 'current_map_route_marker.png',
            }); 
        });
    }

    clusterPublic = new MarkerClusterer(map, marks, {
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
}

const setPublic = () => {
    try{
        marks?.forEach(m => m.markerTypes?.includes('PUBLIC') ? m.setVisible(true) : m.setVisible(false));
        clusterPublic.repaint();
    }catch (e){
        window.ReactNativeWebView.postMessage("ERROR ON REPAINT PUBLIC#$#"+JSON.stringify(e));
    }
}

const setFavourites = () => {
    try{
        marks?.forEach(m => m.markerTypes?.includes('FAVORITE') ? m.setVisible(true) : m.setVisible(false));
        clusterPublic.repaint();
        window.ReactNativeWebView.postMessage("ERROR ON REPAINT PRIVATE#$#");
    }catch (e){
        window.ReactNativeWebView.postMessage("ERROR ON REPAINT FAVORITE#$#"+JSON.stringify(e));
    }
}

const setPrivate = () => {
    try{
        marks?.forEach(m => m.markerTypes?.includes('OWN') ? m.setVisible(true) : m.setVisible(false));
        clusterPublic.repaint();
    }catch (e){
        window.ReactNativeWebView.postMessage("ERROR ON REPAINT PRIVATE#$#"+JSON.stringify(e));
    }
}

const clearMarkersCluster = () => {
    clusterPublic.clearMarkers();
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>

`;
