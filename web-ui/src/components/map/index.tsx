import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), {
    ssr: false, // leaflet depends on window so we dynamically load on client side
});

export default Map;