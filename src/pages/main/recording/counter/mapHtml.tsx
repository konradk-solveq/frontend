export default `
<script>
let map;
let marker;

const setPositionOnMap = pos => {
    map.setOptions({
        center: new google.maps.LatLng(pos.lat, pos.lng),


    });

    // LatLng latLng = new LatLng(pos.lat, pos.lng);
    // CameraPosition cameraPosition = new CameraPosition.Builder()
    // .target(latLng)
    // .tilt(0)
    // .zoom(15)
    //     .bearing(pos.heading)
    //     .build();
    // map.animateCamera(CameraUpdateFactory.newCameraPosition(cameraPosition));

    // map.style.setProperty('transform','rotate(90deg)');
    // map.style.transform = 'rotate(180)';
};

const setMarkerPositionOnMap = pos => {
    marker.setOptions({
        position: pos,
        map: map,
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
        zoom: 15,
    });

    marker = new google.maps.Marker();

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

    window.ReactNativeWebView.postMessage("map is ready");
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>
`