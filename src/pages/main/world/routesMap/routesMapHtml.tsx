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
//NOTION!: All null-safty operators (optional chaining) has been removed,
//because it didn't work on some devices with Android 9

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

const getSVGMarker = () => {
    return {
        path: "M10.941 3.73a1.133 1.133 0 0 1 2.118 0l5.851 14.638c.396.99-.59 1.966-1.535 1.521l-4.899-3.369a1.115 1.115 0 0 0-.952 0l-4.9 3.37c-.944.444-1.93-.533-1.534-1.522L10.94 3.73Z",
        fillColor: "#333",
        fillOpacity: 1,
        strokeColor: '#fff',
        strokeWeight: 2,
        rotation: 0,
        scale: 1.2,
        zIndex: 1000,
        anchor: new google.maps.Point(12, 12),
    }
}

const rotateUserLocationMarker = (heading) => {
    if(heading !== undefined && heading !== null) {
        let updatedMarker = my_location && my_location.icon;

        if(!updatedMarker || !updatedMarker.icon){
            updatedMarker = getSVGMarker();
        }

        updatedMarker.rotation = heading;

        window.requestAnimationFrame(() => {
            my_location.setIcon(updatedMarker)
        })
    }
}

let map;
let routePath;
const googleMap = document.getElementById('map');

let my_location = null;
const setMyLocation = position => {
    let latLng = new google.maps.LatLng(position.latitude, position.longitude);

    if (map) {
        if (my_location) {
            my_location.setPosition(latLng);
        } else {
            const svgMarker = getSVGMarker();

            my_location = new google.maps.Marker({
                id: 'my_location',
                position: latLng,
                icon: svgMarker,
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
        keyboardShortcuts: false,
    });

    setPosOnMap(pos)

    // dla zmiany pozycji regionu
    map.addListener('dragend', getRgion);
    map.addListener('zoom_changed', getRgion);
    setTimeout(() => {
        getRgion();
    }, 1500);
    map.addListener('click', () => {
        window.ReactNativeWebView.postMessage("clickMap");
    });
}

// dodawanie punkt??w po zmianie regionu
const marks = [];
const privateMarks = [];
const plannedMarks = [];
const routeMarks = [];
let clusterPublic = null;
let clusterPrivate = null;
let clusterPlanned = null;
let startMark
let endMark

const setMarks = places => {
    for (let p of places) {
        if(!p){
            continue;
        }

        let id = p.details.id;
        if (marks.some(e => e.id == id)) continue;
        if (privateMarks.some(e => e.id == id)) continue;
        if (plannedMarks.some(e => e.id == id)) continue;
        
        const marekrTypesExists = p.markerTypes &&  p.markerTypes.length;
        const isPlanned = marekrTypesExists && p.markerTypes.includes('FAVORITE');
        const isPrivate = marekrTypesExists && (p.markerTypes.includes('PRIVATE') ||  p.markerTypes.includes('OWN'));
        const privateImage = isPrivate && 'pinroute_private.png';
        const plannedImage = isPlanned && 'pinroute_planned.png';
        const publicImage = 'pinroute_published.png';
        const markerImage = privateImage || plannedImage || publicImage;

        let mark = new google.maps.Marker({
            id,
            position: new google.maps.LatLng(p.lat, p.lng),
            icon: markerImage,
            map: map,
            details: p.details,
            markerTypes: [...p.markerTypes]
        });

        /**
         * Private have the highest priority, then planned and public as last.
         */
        if(isPrivate){
            privateMarks.push(mark);
        }else if(isPlanned){
            plannedMarks.push(mark);
        }else{
            marks.push(mark);
        }
        if(!mark || !mark.markerTypes){
            continue;
        }
        window.ReactNativeWebView.postMessage("clickMarkerToAdd#$#"+customJsonStringify(mark.markerTypes, ''));
        google.maps.event.addDomListener(mark, 'click', function() {
            if(mark.details){
                window.ReactNativeWebView.postMessage("clickMarker#$#"+customJsonStringify({...mark.details, markerTypes: mark.markerTypes}, ''));
            }
        });
    }

    clusterPublic = new MarkerClusterer(map, marks, {
        ignoreHidden: true,
        minimumClusterSize: 3,
        styles: [{
                url: "pinroute_published_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 17,
                textColor: "#fff",
                width: 32,
                height: 32,
                anchor:[16,16],
            },
        ]
    });
    clusterPrivate = new MarkerClusterer(map, privateMarks, {
        ignoreHidden: true,
        minimumClusterSize: 3,
        styles: [{
                url: "pinroute_private_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 17,
                textColor: "#fff",
                width: 32,
                height: 32,
                anchor:[16,16],
            },
        ]
    });
    clusterPlanned = new MarkerClusterer(map, plannedMarks, {
        ignoreHidden: true,
        minimumClusterSize: 3,
        styles: [{
                url: "pinroute_planned_empty.png",
                fontFamily: "DIN2014Narrow-Regular",
                textSize: 17,
                textColor: "#fff",
                width: 32,
                height: 32,
                anchor:[16,16],
            },
        ]
    });
}

const setPath = (path, mapType) => {
    const coords = path.map(([lat, lng]) => ({lat, lng}));
    if (!coords || !coords.length || coords.length<2) {
        return;
    }

    const start = coords[0];
    const end = coords[coords.length - 1];
    const isPlanned = mapType ==='favourite';
    const isPrivate = mapType === 'private';
    const privateImage = isPrivate && 'pinroute_private.png';
    const plannedImage = isPlanned && 'pinroute_planned.png';
    const publicImage = 'pinroute_start.png';
    const markerImage = privateImage || plannedImage || publicImage;
    if (!startMark){
        startMark = new google.maps.Marker({
            id: 'route-start',
            position: new google.maps.LatLng(start.lat, start.lng),
            icon: markerImage,
            map,
        });
    } else {
        startMark.setIcon(markerImage);
        startMark.setMap(map);
        startMark.setPosition(new google.maps.LatLng(start.lat, start.lng));
    }
    
    if(!endMark) {
        endMark = new google.maps.Marker({
            id: 'route-end',
            position: new google.maps.LatLng(end.lat, end.lng),
            icon: 'pinroute_end.png',
            map,
        });
    } else {
        endMark.setMap(map);
        endMark.setPosition(new google.maps.LatLng(end.lat, end.lng));
    }
    
    routePath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: "#C63733",
        strokeOpacity: 1.0,
        strokeWeight: 3,
    });

        
    if(routePath){
        routePath.setMap(map);
    }
}

const clearPath = () => {
    if(routePath){
        routePath.setMap(null);
    }
    if(startMark){
        startMark.setMap(null);
    }
    if(endMark){
        endMark.setMap(null);
    }
}

const clearMarkersCluster = () => {
    if(clusterPublic){
        clusterPublic.clearMarkers();
    }

    if(clusterPrivate){
        clusterPrivate.clearMarkers();
    }

    if(clusterPlanned){
        clusterPlanned.clearMarkers();
    }
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>

`;
