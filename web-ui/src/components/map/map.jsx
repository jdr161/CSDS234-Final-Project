import {
    MapContainer,
    TileLayer,
    GeoJSON,
    CircleMarker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Info from "../info";


// with help from https://github.com/CodingWith-Adam/geoJson-map-with-react-leaflet/blob/master/src/components/MyMap.jsx#L27

function Map({ mapData }) {

    const logTest = (e) => {
        console.log(e.target)
    }

    const highlightFeature = (e) => {
        var layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        layer.bringToFront();
    }

    function resetHighlight(e) {
        var layer = e.target;

        layer.setStyle(countryStyle);
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        // console.log(countryName);
        layer.bindPopup(countryName);

        layer.on({
            click: logTest,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    };

    const countryStyle = {
        fillColor: "red",
        fillOpacity: 1,
        color: "black",
        weight: 2,
    };

    return (
        <div className="d">
            <div>
                <MapContainer center={[40.609787846393196, 20.7890265133657]} zoom={5}>
                    
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        style={countryStyle}
                        data={mapData.features}
                        onEachFeature={onEachCountry}
                        // setStyle={highlightFeature}
                        // resetStyle={resetHighlight}
                        
                    />
                    <Info/>

                </MapContainer>
            </div>
        </div>
    );
}

export default Map;