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

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        // console.log(countryName);
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

                    
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GeoJSON
                        style={countryStyle}
                        data={mapData.features}
                        onEachFeature={onEachCountry}
                        
                    />
                    <Info/>

                </MapContainer>
            </div>
        </div>
    );
}

export default Map;