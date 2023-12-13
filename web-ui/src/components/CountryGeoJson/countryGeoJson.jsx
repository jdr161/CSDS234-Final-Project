import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

var hash = require('object-hash');

function CountryGeoJson({ mapData, data, getColor, setSelected }) {
    const [key, setKey] = useState(hash(data))
    
    const getCountryStyle = (layer) => {
        if (!data.USA){
            return {
                fillColor: 'gray',
                fillOpacity: 1,
                color: "black",
                weight: 2,
                fillOpacity: 0.7,
            };
        } else {
            const arr = Object.values(data);
            const max = Math.max(...arr);
            const min = Math.min(...arr);
            const iso_code = layer.feature.properties.ISO_A3;

            let color;
            if (!data[iso_code]) {
                color = 'gray'
            } else {
                color = getColor(data[layer.feature.properties.ISO_A3], min, max);
            }
            return {
                fillColor: color,
                fillOpacity: 1,
                color: "black",
                weight: 2,
                fillOpacity: 0.7,
            };
        }
    }

    useEffect(() => {
        setKey(hash(data))
    }, [data])

    const highlightFeature = (e) => {
        let layer = e.target;
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
        let layer = e.target;
        layer.setStyle(getCountryStyle(layer));
        setSelected({})
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        layer.bindPopup(countryName);

        layer.on({
            // click: ,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });

        layer.setStyle(getCountryStyle(layer));
    };

    return (
        <GeoJSON key={key} data={mapData.features} onEachFeature={onEachCountry} />

    )
} export default CountryGeoJson;