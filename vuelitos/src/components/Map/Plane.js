import React from "react";
import { Marker, Popup } from "react-leaflet";
import { PlaneLocation } from "./PlaneLocation";

const Plane = (props) => {
    const planesArray = props.planesData;

    const planes = Object.keys(planesArray).map((planeId) => {
        const plane = planesArray[planeId];
        const lat = plane.position.lat;
        const lon = plane.position.long;

        return (
          <Marker
            key={planeId}
            position={[lat, lon]}
            icon={PlaneLocation}
            >
            <Popup>
              <div>
                <h3>Vuelo: {plane.flight_id}</h3>
                <p>Aerolinea: {plane.airline.name}</p>
                <p>Capitan: {plane.captain}</p>
                <p>ETA: {plane.ETA}</p>
                <p>Estado: {plane.status}</p>
              </div>
            </Popup>
          </Marker>
        );
    });

    return (
        planes
    );
};

export default Plane;