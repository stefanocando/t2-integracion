import { Marker } from "react-leaflet";
import { CrashLocation } from "./CrashLocation";

const Crash = (props) => {
    return (
        <>
            {Object.keys(props.crashedPlanes).map((flightId) => {
                const crash = props.crashedPlanes[flightId];
                return (
                    <Marker
                        key={flightId}
                        position={[crash.position.lat, crash.position.long]}
                        icon={CrashLocation}
                    />
                );
                // console.log(crash);
            })}
        </>
    );
}

export default Crash;
