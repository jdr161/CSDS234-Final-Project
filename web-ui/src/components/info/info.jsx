import { useEffect } from "react";
import L from "leaflet";
import styles from "./info.module.css";
import { useMap } from "react-leaflet";

function Info() {
    const map = useMap()

    useEffect(() => {
        const legend = L.control({ position: "bottomright" });

        legend.onAdd = () => {
        const div = L.DomUtil.create("div");
        div.innerHTML =
            "<h4>This is the legend</h4>" +
            "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
        div.className = `${styles.info} ${styles.legend}`;
        return div;
        };

        legend.addTo(map);
        // cleanup when demounted
        return () => {
            legend.remove();
        }
      }, [map]);
      return null;
}

export default Info;
