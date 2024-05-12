import Map from "./Map.jsx";
import {useLoadScript} from "@react-google-maps/api";
import LoadingAlert from "../alerts/LoadingAlert.jsx";

const apiGoogleMaps = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const libraries = ["places"]

export default function MapContainer() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: apiGoogleMaps,
        libraries:libraries
    })

    return (

        <div className='flex justify-center items-center'>
            {isLoaded ? <Map/> : <LoadingAlert/>}
        </div>

    )
}