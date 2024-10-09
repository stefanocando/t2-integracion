import './App.css';
import React, { useState } from 'react';
import useWebSocket from 'react-use-websocket'

import MapView from './components/Map/MapView';
import ChatWindow from './components/Chat/Chat';
import DataTable from './components/Table/DataTable';

const URL = "wss://tarea-2.2024-2.tallerdeintegracion.cl/connect"

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

function App() {

  const [flights, setFlights] = useState({});
  const [planes, setPlanes] = useState({});
  const [messages, setMessages] = useState([]);
  const [planeLines, setPlaneLines] = useState({});
  const [shortestPath, setShortestPath] = useState({});
  const [crashedPlanes, setCrashedPlanes] = useState({});

  const addOrUpdatePlane = (flight_id, plane) => {
    setPlanes((prevPlanes) => {
      if (flight_id in prevPlanes) {
        return {
          ...prevPlanes,
          [flight_id]: {
            ...prevPlanes[flight_id],
            ...plane
          }
        };
      } else {
        return {
          ...prevPlanes,
          [flight_id]: plane
        };
      }
    });
  };

  const addPlaneTrayectory = (flight_id, plane) => {
    setPlaneLines((prevPlaneLines) => {
      if (flight_id in prevPlaneLines) {
        return {
          ...prevPlaneLines,
          [flight_id]: [
            ...prevPlaneLines[flight_id],  // Mantener las posiciones anteriores
            plane.position                 // Agregar la nueva posición
          ]
        };
      } else {
        return {
          ...prevPlaneLines,
          [flight_id]: [plane.position]    // Crear una nueva lista de posiciones si no existe
        };
      }
    });
  };

  const addShortestPath = (flight_id, plane) => {
    if (!flights[flight_id]) return;
    const flightDestination = flights[flight_id].destination.location;
    const flightOrigin = flights[flight_id].departure.location;
    setShortestPath((prevShortestPath) => {
      if (flight_id in prevShortestPath) {
        return {
          ...prevShortestPath,
          [flight_id]: {
            currentPosition: flightOrigin,
            destination: flightDestination,
          }
        };
      } else {
        return {
          ...prevShortestPath,
          [flight_id]: {
            currentPosition: flightOrigin,
            destination: flightDestination,
          }
        };
      }
    });
  };

  const deletePlanesNotInFlights = (flights) => {
    setPlanes((prevPlanes) => {
      const newPlanes = { ...prevPlanes };
      for (let flight_id in newPlanes) {
        if (!(flight_id in flights)) {
          delete newPlanes[flight_id];
          deletePlaneTrayectory(flight_id);
        }
      }
      return newPlanes;
    });
  };

  const deletePlaneTrayectory = (flight_id) => {
    setPlaneLines((prevPlaneLines) => {
      const newPlaneLines = { ...prevPlaneLines };
      delete newPlaneLines[flight_id];
      return newPlaneLines;
    });
  }

  const getPlaneByFlightId = (flight_id) => {
    return planes[flight_id] || null;
  };

  const { sendMessage } = useWebSocket(URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
      const joinEvent = {
        type: 'join',
        id: "1964177J",
        username: "stefanocando"
      };
      sendMessage(JSON.stringify(joinEvent));
    },
    onMessage: (message) => {
      let messageObject = JSON.parse(message.data);
      if (messageObject.type === 'flights') {
        setFlights(messageObject.flights);
        deletePlanesNotInFlights(messageObject.flights);
      }
      else if (messageObject.type === 'plane') {
        addOrUpdatePlane(messageObject.plane.flight_id, messageObject.plane);
        addPlaneTrayectory(messageObject.plane.flight_id, messageObject.plane);
        addShortestPath(messageObject.plane.flight_id, messageObject.plane);
      }
      else if (messageObject.type === 'take-off') {
      }
      else if (messageObject.type === 'landing') {
        deletePlaneTrayectory(messageObject.flight_id);
      }
      else if (messageObject.type === 'crashed') {
        const planeDead = getPlaneByFlightId(messageObject.flight_id);
        if (planeDead) {
          setCrashedPlanes(prevCrashedPlanes => ({
            ...prevCrashedPlanes,
            [messageObject.flight_id]: planeDead
          }));
      
          setTimeout(() => {
            setCrashedPlanes(prevCrashedPlanes => {
              const newCrashedPlanes = { ...prevCrashedPlanes };
              delete newCrashedPlanes[messageObject.flight_id]; // Eliminar el avión
              return newCrashedPlanes;
            });
          }, 30000);
        }
        deletePlaneTrayectory(messageObject.flight_id);
      }
      else if (messageObject.type === 'chat') {
        let timestamp = getCurrentTime();
        setMessages(prevMessages => [...prevMessages, `${timestamp} - Server: ${messageObject.content}`]);
      }
      else if (messageObject.type === 'message') {
        let data = messageObject.message;
        setMessages(prevMessages => [...prevMessages, `${data.date} - ${data.name}: ${data.content}`]);
      }
    },
    onError: (error) => {
      console.log('Error en la conexión WebSocket:', error);
    },
    onClose: () => {
      console.log('Conexión WebSocket cerrada.');
    },
    shouldReconnect: (closeEvent) => {
      console.log('Intentando reconectar WebSocket...');
      // Se puede personalizar el tiempo de reconexión
      return true; // Intentar reconectar inmediatamente
    }
  });

  const handleSendMessage = (msg) => {
    if (msg.trim()) {
      const timestamp = getCurrentTime();
      setMessages(prevMessages => [...prevMessages, `${timestamp} - Tú: ${msg}`]);

      const messageEvent = {
        type: 'message',
        content: msg
      };
      sendMessage(JSON.stringify(messageEvent));
    }
  };

  return (
    <div className="App">
      <MapView planesData = {planes} flightsData={flights} trayectory={planeLines} shortestPath={shortestPath} crashedPlanes={crashedPlanes}/>
      <ChatWindow messages={messages} sendMessage={handleSendMessage} />
      <DataTable flightsData={flights} planesData={planes}/>
    </div>
  );
}

export default App;
