import L from "leaflet";
import StartAirport from "../../assets/start.svg";

export const AirportInicioLogo = L.icon({
    iconUrl: StartAirport,
    iconRetinaUrl: StartAirport,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
});
