var map = L.map('map').setView([45.509330, -122.670476], 11);
var VancouverMarker = L.marker([45.638728, -122.670476]).addTo(map);
var OCHINmarker = L.marker([45.5094603, -122.677897]).addTo(map);

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
    console.log(collection.features);
    var buslines = collection.features.filter(function(item){
        return item.properties["ROUTE"] == 6 || item.properties["ROUTE"] == 56;
    });
    L.geoJson(buslines, {
        onEachFeature: onEachFeature,
        style: style
    }).addTo(map);

    L.control.layers().addTo(map);
});

function onEachFeature(feature, layer) {
    if (feature.properties) {
        var popup = L.popup();
        // TODO: show popup on mouseover
        popup.setContent('<b>Bus Line: ' + feature.properties.ROUTE + '</b>');
        layer.on('mouseover', function() {
            layer.setStyle({color : 'yellow', opacity: '1'});
            layer.bindPopup(popup);
        });
        layer.on('mouseout', function() {
            layer.setStyle(style(feature));
        })
    }
}

function style(feature) {
    // TODO: edit conditional statement so that buses are each a different color
    if (feature.properties.ROUTE == "56") {
        return {
            color: 'mediumturquoise',
            weight: 2,
            opacity: .5
        }
    }
    else {
        return {
            color: 'blue',
            weight: 2,
            opacity: .5
        }
    }

}

// TODO: change color of individual buslines
// TODO: add bus stop shapefiles (clip with QGIS?)
// TODO: select lines/stops that are within walking distance of OCHIN
// TODO: style markers and popups
// TODO: create legend
