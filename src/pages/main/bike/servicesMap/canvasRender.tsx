import React, {useState, useEffect, useRef} from 'react';
import {
    StyleSheet,
    Dimensions,
    SafeAreaView,
    View,
    Platform,
} from 'react-native';
import AnimSvg from '../../../../helpers/animSvg';

import {
    setObjSize,
    getHorizontalPx,
    getVerticalPx,
} from '../../../../helpers/layoutFoo';

const canvas = `    <style>
#map,
canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
<canvas></canvas>
<div id="map"></div>


<script>
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
c.fillStyle = 'green';

const startPos = {
    x: 0,
    y: 0
};
const move = {
    x: 0,
    y: 0
};

const draw = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.save();
    c.transform(1, 0, 0, 1, move.x, move.y);
    c.fillRect(0, 0, 50, 50);
    c.restore();
}
draw();

const touchmove = e => {
    move.x = e.touches[0].clientX - startPos.x;
    move.y = e.touches[0].clientY - startPos.y;
    draw();
};

const touchend = () => {
    canvas.removeEventListener('touchmove', touchend);
    canvas.removeEventListener('touchend', touchend);
}

canvas.addEventListener('touchstart', e => {
    startPos.x = e.touches[0].clientX;
    startPos.y = e.touches[0].clientY;
    canvas.addEventListener('touchmove', e => touchmove(e));
    canvas.addEventListener('touchend', touchend);
})

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(-33.91722, 151.23064),
        zoom: 16,
    });
    const icons = {
        parking: {
            icon: "icon.png",
        },
        library: {
            icon: "icon2.png",
        },
        info: {
            icon: "icon3.png",
        },
    };
    const features = [{
        position: new google.maps.LatLng(-33.91721, 151.2263),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91539, 151.2282),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.9191, 151.22907),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.9179, 151.23463),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.916988, 151.23364),
        type: "info",
    }, {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: "parking",
    }, {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: "library",
    }, ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
        });
    }
}

</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcuDhYsJJqOBvWppdbLf5y75V8OdNOevQ&map_ids=2ffa275ecc610735&callback=initMap">
</script>
`;

const CanvasView: React.FC<Props> = (props: Props) => {
    const styles = StyleSheet.create({
        canvasWrap: {
            flex: 1,
            width: getHorizontalPx(414),
            height: getVerticalPx(896),
            position: 'absolute',
            left: 0,
            top: 0,
            // backgroundColor: 'khaki',
        },
        canvas: {
            flex: 1,
            width: 300,
            height: 300,
            position: 'absolute',
            left: 0,
            top: 0,
        },
    });
    return <AnimSvg style={styles.canvasWrap} source={canvas} />;
};

export default CanvasView;
