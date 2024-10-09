import React from 'react';
import './DataTable.css';

function DataTable({ flightsData, planesData }) {
  if (flightsData === 0 || planesData === 0) {
    return (
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Flight ID</th>
              <th>Origin</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>ETA</th>
            <th>Captain</th>
            <th>Distance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {Object.keys(flightsData)
          .sort((a, b) => {
            const departureA = flightsData[a].departure.name.toLowerCase();
            const departureB = flightsData[b].departure.name.toLowerCase();
            const destinationA = flightsData[a].destination.name.toLowerCase();
            const destinationB = flightsData[b].destination.name.toLowerCase();

            // Primero ordena por departure
            if (departureA < departureB) return -1;
            if (departureA > departureB) return 1;

            // Si los departure son iguales, ordena por destination
            if (destinationA < destinationB) return -1;
            if (destinationA > destinationB) return 1;

            return 0; // Son iguales
          })
          .map((flightKey) => (
            <tr key={flightKey}>
              <td>{flightsData[flightKey].id}</td>
              <td>{flightsData[flightKey].departure.name}</td>
              <td>{flightsData[flightKey].destination.name}</td>
              {/* Verifica si el ETA existe antes de mostrarlo */}
              <td>{planesData[flightKey]?.ETA ? planesData[flightKey].ETA.toFixed(4) : ''}</td>
              <td>{planesData[flightKey]?.captain || ''}</td>
              <td>{planesData[flightKey]?.distance ? planesData[flightKey].distance.toFixed(2) : ''} m</td>
              <td>{planesData[flightKey]?.status || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;