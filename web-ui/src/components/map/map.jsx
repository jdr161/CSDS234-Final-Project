import {
    MapContainer,
    TileLayer,
} from "react-leaflet";
import L from "leaflet";
import { useState, useMemo, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import Info from "../info";
import Legend from "../legend"
import styles from "./map.module.css"
import Gradient from "javascript-color-gradient";
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
        if (!date) {
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

    const calculateGradientArr = (data) => {
        const colorArray = new Gradient()
            .setColorGradient("#3F2CAF", "#e9446a")
            .getColors();
        const arr = Object.values(data);
        const max = Math.max(...arr);
        const min = Math.min(...arr);
        let gradArr = new Array(10);
        for (let i = 0; i < 9; i++) {
            let val = min + i * ((max - min) / 9)
            let nextval = min + (i + 1) * ((max - min) / 9)
            gradArr[9 - i] = {
                color: colorArray[i],
                level: val.toString().concat("-", nextval.toString())
            }
        }
        let val = min + 9 * ((max - min) / 9)
        gradArr[0] = {
            color: colorArray[9],
            level: val.toString().concat("+")
        }
        setgradientArr(gradArr)
    }

    // Make sure we only rerender on relevant state updates
    const tileLayer = useMemo(() => <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />, [])
    const info = useMemo(() => <Info gradientArr={gradientArr} />, [gradientArr]);
    const legend = useMemo(() => <Legend selected={selected} />, [selected])
    const geoJSON = useMemo(() => <CountryGeoJson mapData={mapData} data={data} getColor={(number) => { return "blue" }} setSelected={(val) => setSelected(val)} />, [data])

    return (
        <div className={styles.map}>
            <MapContainer center={[0, 0]} zoom={3} maxBounds={bounds} minZoom={2} maxZoom={6}>
                {tileLayer}
                {geoJSON}
                {info}
                {legend}
            </MapContainer>
        </div>
    );
}

export default Map;