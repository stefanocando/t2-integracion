import React from "react";
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Plane from "./Plane";
import Airport from "./Airport";
import Crash from "./Crash";

const MapView = (props) => {

    const keys = props.trayectory ? Object.keys(props.trayectory) : [];
    const pathKeys = props.shortestPath ? Object.keys(props.shortestPath) : [];
    
    return (
        <MapContainer center={[-0.45694, 60.64827]} zoom={2.2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
            <Plane planesData = {props.planesData}/>
            <Airport flightsData = {props.flightsData} planesData={props.planesData}/>
            {keys.length > 0 &&
                keys.map(key => {
                const flightPath = props.trayectory[key].map(point => [point.lat, point.long]); // Transformar las coordenadas
                return <Polyline key={key} positions={flightPath} weight={1} color="red" />;
                })
            }
            {pathKeys.length > 0 &&
                pathKeys.map(pathKey => {
                const path = [[props.shortestPath[pathKey].currentPosition.lat, props.shortestPath[pathKey].currentPosition.long], [props.shortestPath[pathKey].destination.lat, props.shortestPath[pathKey].destination.long]];
                return <Polyline key={pathKey} positions={path} weight={1} color="yellow" />;
                })
            }
        <Crash crashedPlanes={props.crashedPlanes}/>
        </MapContainer>
    );
}

export default MapView