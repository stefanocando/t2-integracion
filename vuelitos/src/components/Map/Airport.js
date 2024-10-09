import React from "react";
import { Marker, Popup } from "react-leaflet";
import { AirportInicioLogo } from "./AirportStart";
import L from "leaflet";
import { AirportEndLogo } from "./AirportEnd";

const Airport = (props) => {
    const flightsData = props.flightsData;
    const planesData = props.planesData;

    const createCustomIcon = (status, defaultIcon) => {
      if (status === "take-off") {
          return L.divIcon({
              className: "custom-marker",
              html: `<div style="background-color: green; border-radius: 25%; width: 30px; height: 30px;"></div>`,
          });
      }
      return defaultIcon; // Usa el icono por defecto si no es "hola"
    };

    const createCustomArrival = (status, defaultIcon) => {
      if (status === "arrived") {
          return L.divIcon({
              className: "custom-marker",
              html: `<div style="background-color: blue; border-radius: 25%; width: 30px; height: 30px;"></div>`,
          });
      }
      return defaultIcon; // Usa el icono por defecto si no es "hola"
    };

    const flights = Object.keys(flightsData).map((flightId) => {
        if (!planesData[flightId]) return null;
        const status = planesData[flightId].status;
        const flight = flightsData[flightId];
        const lat = flight.departure.location.lat;
        const lon = flight.departure.location.long;
        const originName = flight.departure.name;
        const originCity = flight.departure.city.name;
        const originCountry = flight.departure.city.country.name;

        const destinationLat = flight.destination.location.lat;
        const destinationLon = flight.destination.location.long;
        const destinationName = flight.destination.name;
        const destinationCity = flight.destination.city.name;
        const destinationCountry = flight.destination.city.country.name;

        return (
            <React.Fragment key={flightId}>
            <Marker
              position={[lat, lon]}
              icon={createCustomIcon(status, AirportInicioLogo)}
            >
              <Popup>
                <div>
                  <h3>Aeropuerto de Origen</h3>
                  <p>Nombre: {originName}</p>
                  <p>Vuelo: {flightId}</p>
                  <p>Coordenadas: {lat}, {lon}</p>
                  <p>Ciudad: {originCity}</p>
                  <p>País: {originCountry}</p>
                </div>
              </Popup>
            </Marker>
            <Marker
              position={[destinationLat, destinationLon]}
              icon={createCustomArrival(status, AirportEndLogo)}
              >
              <Popup>
                <div>
                  <h3>Aeropuerto de Destino</h3>
                  <p>Nombre: {destinationName}</p>
                  <p>Vuelo: {flightId}</p>
                  <p>Coordenadas: {lat}, {lon}</p>
                  <p>Ciudad: {destinationCity}</p>
                  <p>País: {destinationCountry}</p>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
    });

    return (
        flights
    );
};


export default Airport;
