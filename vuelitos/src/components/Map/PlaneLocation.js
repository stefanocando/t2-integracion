import L, { icon } from "leaflet";
import Plane from "../../assets/plane.svg";

export const PlaneLocation = L.icon({
    iconUrl: Plane,
    iconRetinaUrl: Plane,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
});
