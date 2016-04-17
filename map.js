var map = L.map('map').setView([45.509330, -122.677826], 11);
var VancouverMarker = L.marker([45.638728, -122.661486]).addTo(map);
var OCHINmarker = L.marker([45.509330, -122.677826]).addTo(map);

VancouverMarker.bindPopup("<b>Downtown Vancouver</b>").openPopup();
OCHINmarker.bindPopup("<b>OCHIN</b>").openPopup();

var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var wholink =
    '<a href="http://stamen.com">Stamen Design</a>';
L.tileLayer(
    'http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors & ' + wholink,
        maxZoom: 18
    }).addTo(map);

// Adding layers with D3

d3.json("buslines.geojson", function(collection) {

    var buslines = [collection];
    L.geoJson(buslines, {
        onEachFeature: onEachFeature
    }).addTo(map);

    overlays["geojson_d3"] = geojson_d3;
    L.control.layers(baseLayers, overlays).addTo(map);
});

function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup('<b>Bus Line: ' + Number(feature.properties.RTE) + '</b>');
    }
}

// var popup = L.popup();
// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);