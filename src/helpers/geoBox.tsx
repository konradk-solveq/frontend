const oneKm = (1 / 60 / 1852) * 1000; // 1 km w stopniach

const geoBox = (pos = {lon: 18.7167, lat: 54.1}, distance = 2) => {
    // distance podane w km
    let angle = pos.lat * (Math.PI / 2);
    let x = distance * -Math.cos(angle) * oneKm;
    let y = distance * oneKm;
    let box = {
        left: pos.lon - x,
        right: pos.lon + x,
        top: pos.lat - y,
        bottom: pos.lat + y,
    };
    return box;
};

export default geoBox;