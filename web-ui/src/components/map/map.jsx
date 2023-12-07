import {
    MapContainer,
    TileLayer,
    GeoJSON,
    CircleMarker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapData from '../../data/countrydata/countries.json'

// with help from https://github.com/CodingWith-Adam/geoJson-map-with-react-leaflet/blob/master/src/components/MyMap.jsx#L27

function Map() {
    const logTest = (e) => {
        console.log(e.target)
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        console.log(countryName);
        layer.bindPopup(countryName);

        layer.on({
            click: logTest,
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
            {/*leaflet and react-leaflet*/}
            <div>
                <MapContainer center={[40.609787846393196, 20.7890265133657]} zoom={5}>

                    <GeoJSON
                        style={countryStyle}
                        data={mapData.features}
                        onEachFeature={onEachCountry}
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default Map;