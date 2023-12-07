import {
    MapContainer,
    TileLayer,
    CircleMarker,
    Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function Map() {
    return (
        <div className="d">
            {/*leaflet and react-leaflet*/}
            <div>
                <MapContainer center={[40.609787846393196, 20.7890265133657]} zoom={5}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default Map;