var map = L.map('map').setView([45.509330, -122.677826], 14);
var marker = L.marker([45.509330, -122.677826]).addTo(map);
var circle = L.circle([45.509330, -122.677826], 300, {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.5
}).addTo(map);
marker.bindPopup("<b>OCHIN</b>").openPopup();
circle.bindPopup("I am a circle.");

var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var wholink =
    '<a href="http://stamen.com">Stamen Design</a>';
L.tileLayer(
    'http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors & ' + wholink,
        maxZoom: 18,
    }).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
