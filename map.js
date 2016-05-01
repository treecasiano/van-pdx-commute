var map = L.map('map').setView([45.509330, -122.670476], 11);
var VancouverMarker = L.marker([45.638728, -122.670476]).addTo(map);
var OCHINmarker = L.marker([45.5094603, -122.677897]).addTo(map);
var legend = L.control({
    position: 'topright'
});
var mapLink =
    '<a href="http://openstreetmap.org">OpenStreetMap</a>';
var wholink =
    '<a href="http://stamen.com">Stamen Design</a>';

VancouverMarker.bindPopup("<b>Downtown Vancouver</b>").openPopup();
OCHINmarker.bindPopup("<b>OCHIN</b>").openPopup();

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        labels = ['<strong>Transit Types</strong>'],
        categories = ['Bus','Light Rail'];
    for (var i = 0; i < categories.length; i++) {

        div.innerHTML +=
            labels.push(
                '<i class="legend-icon" style="background-color:' + getColor(categories[i]) + '"></i> ' +
                (categories[i] ? categories[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
    return div;
};
legend.addTo(map);

L.tileLayer(
    'http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors & ' + wholink,
        maxZoom: 18
    }).addTo(map);

// Adding layers with D3
d3.json("buslines.geojson", function(collection) {
    var buslines = collection.features.filter(function(item){
        return item.properties["ROUTE"] == 6;
    });
    L.geoJson(buslines, {
        onEachFeature: onEachBuslineFeature,
        style: styleBus
    }).addTo(map);
});

d3.json("lrt_line.geojson", function(collection) {
    var maxLines = collection.features.filter(function(item){
        return item.properties["TYPE"];
    });
    L.geoJson(maxLines, {
        onEachFeature: onEachMaxFeature,
        style: styleMax
    }).addTo(map);
});

function onEachBuslineFeature(feature, layer) {
    if (feature.properties) {
        var popup = L.popup();
        // TODO: show popup on mouseover
        popup.setContent('<b>Bus Line: ' + feature.properties.ROUTE + '</b>');
        layer.bindPopup(popup);
        layer.on('mouseover', function() {
            layer.setStyle({color : 'yellow', opacity: '1'});
        });
        layer.on('mouseout', function() {
            layer.setStyle(styleBus(feature));
        })
    }
}

function onEachMaxFeature(feature, layer) {
    if (feature.properties) {
        var popup = L.popup();
        // TODO: show popup on mouseover
        popup.setContent('<b>Max Line: ' + feature.properties["LINE"] + '</b>');
        layer.bindPopup(popup);
        layer.on('mouseover', function() {
            layer.setStyle({color : 'orange', opacity: '1'});
        });
        layer.on('mouseout', function() {
            layer.setStyle(styleMax(feature));
        })
    }
}

function styleBus(feature) {
    return {
        color: 'mediumturquoise',
        weight: 3,
        opacity: .75
    }
}

function styleMax(feature) {
    return {
        color: 'fuchsia',
        weight: 3,
        opacity: .75
    }
}

function getColor(d) {
    return d === 'Bus' ? "mediumturquoise" : d === 'Light Rail' ? "fuchsia" : "#ff7f00";
}

// TODO: add more buslines and change color of individual buslines
// TODO: add bus stop shapefiles within walking distance from OCHIN (clip with QGIS?)
// TODO: style markers and popups
