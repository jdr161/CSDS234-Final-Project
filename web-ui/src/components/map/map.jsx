import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { useState, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import GradientInfo from "../gradientInfo";
import CountryInfo from "../countryInfo"
import styles from "./map.module.css"
import chroma from "chroma-js";
import CountryGeoJson from "../CountryGeoJson";

var southWest = L.latLng(-85, -180)
var northEast = L.latLng(85, 180)
const bounds = L.latLngBounds(southWest, northEast);

// with help from https://github.com/CodingWith-Adam/geoJson-map-with-react-leaflet/blob/master/src/components/MyMap.jsx#L27

function Map({ mapData, dataType, date }) {
    const [selected, setSelected] = useState({})
    const [gradientArr, setgradientArr] = useState([])
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchOptions = {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Authorization": process.env.NEXT_PUBLIC_API_AUTHORIZATION
            },
        }
        let url = ''
        if (date === (new Date()).toISOString().split('T')[0]) {
            url = `/api/get-latest-data?dataType=cases`//${dataType}`
        } else {
            url = `/api/get-data-by-date?dataType=cases`//${dataType}?date=${date.toISOString()}`
        }
        fetch(url, fetchOptions)
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                calculateGradientArr(data)
            })
    }, [dataType, date])

    const getColor = (val, min, max) => {
        const percentage = (val - min)/(max - min);

        if (dataType === "cases"){
            let scale = chroma.scale(['white', 'red']);
            return scale(percentage).hex();
        } else if (dataType === "deaths"){
            let scale = chroma.scale(['white', 'black']);
            return scale(percentage).hex();
        } else {
            let scale = chroma.scale(['white', 'blue']);
            return scale(percentage).hex();
        }
    }

    const calculateGradientArr = (data) => {
        const arr = Object.values(data);
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        let gradArr = new Array(10);
        for (let i = 0; i < 9; i++) {
            let val = min + i * ((max - min) / 9)
            let nextval = min + (i + 1) * ((max - min) / 9)

            gradArr[9 - i] = {
                color: getColor(val, min, max),
                level: val.toString().concat("-", nextval.toString())
            }
        }
        let val = min + 9 * ((max - min) / 9)
        gradArr[0] = {
            color: getColor(val, min, max),
            level: val.toString().concat("+")
        }
        setgradientArr(gradArr)
    }

    // Make sure we only rerender on relevant state updates
    const tileLayer = useMemo(() => <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />, [])
    const gradientInfo = useMemo(() => <GradientInfo gradientArr={gradientArr} />, [gradientArr]);
    const countryInfo = useMemo(() => <CountryInfo selected={selected} />, [selected])
    const geoJSON = useMemo(() => <CountryGeoJson mapData={mapData} data={data} getColor={(val, max, min) => getColor(val, max, min)} setSelected={(val) => setSelected(val)} />, [data])

    return (
        <div className={styles.map}>
            <MapContainer center={[0, 0]} zoom={3} maxBounds={bounds} minZoom={2} maxZoom={6}>
                {tileLayer}
                {geoJSON}
                {gradientInfo}
                {countryInfo}
            </MapContainer>
        </div>
    );
}

export default Map;