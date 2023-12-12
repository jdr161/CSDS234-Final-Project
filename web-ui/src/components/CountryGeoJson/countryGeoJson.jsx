import { GeoJSON } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";

function CountryGeoJson({mapData, data, getColor, setSelected}){
    console.log("rendered geojson")
    const countryStyle = {
        fillColor: getColor(),
        fillOpacity: 1,
        color: "black",
        weight: 2,
        fillOpacity: 0.7,
    };

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
        layer.setStyle(countryStyle);
        setSelected({})
    }

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        // console.log(countryName);
        layer.bindPopup(countryName);

        layer.on({
            // click: ,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    };

    return (
    <GeoJSON style={countryStyle} data={mapData.features} onEachFeature={onEachCountry} />
    )
} export default CountryGeoJson;