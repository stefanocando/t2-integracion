import L, { icon } from "leaflet";
import Crash from "../../assets/explosion-explode.gif";

export const CrashLocation = L.icon({
    iconUrl: Crash,
    iconRetinaUrl: Crash,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [40, 40],
    className: "leaflet-venue-icon",
});
