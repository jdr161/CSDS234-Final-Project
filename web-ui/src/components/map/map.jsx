import {
    MapContainer,
    TileLayer,
    GeoJSON,
    CircleMarker,
    Popup,
} from "react-leaflet";
import { useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";
import Info from "../info";
import Legend from "../legend"
import styles from "./map.module.css"



// with help from https://github.com/CodingWith-Adam/geoJson-map-with-react-leaflet/blob/master/src/components/MyMap.jsx#L27

function Map({ mapData }) {
    const [selected, setSelected] = useState({})

    const countryStyle = {
        fillColor: "red",
        fillOpacity: 1,
        color: "black",
        weight: 2,
        fillOpacity: 0.7,
    };

    const logTest = (e) => {
        console.log(e.target)
    }

    const highlightFeature = (e) => {
        var layer = e.target;
        setSelected(layer.feature.properties);

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        layer.bringToFront();
    }

    const resetHighlight = (e) => {
        var layer = e.target; 
        layer.setStyle(countryStyle);
        setSelected({})
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

    const geoJSON = useMemo(() => <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCountry}/>, [] );
    const info = useMemo(() => <Info/>, []);

    return (
        <div className={styles.map}>
            <div>
                <MapContainer center={[40.609787846393196, 20.7890265133657]} zoom={5}>
                    
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { geoJSON }
                    { info }
                    <Legend selected={selected}/>

                </MapContainer>
            </div>
        </div>
    );
}

export default Map;