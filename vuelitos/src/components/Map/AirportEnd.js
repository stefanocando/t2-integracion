import L from "leaflet";
import EndAirport from "../../assets/end.svg";  

export const AirportEndLogo = L.icon({
    iconUrl: EndAirport,
    iconRetinaUrl: EndAirport,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
});
