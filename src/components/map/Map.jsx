import {useEffect, useMemo, useRef, useState} from "react";
import {GoogleMap, Marker, MarkerF} from "@react-google-maps/api";
import "@reach/combobox/styles.css"
import PlacesAutocomplete from "./PlacesAutocomplete.jsx";
export default function Map() {

    const [selected, setSelected] = useState({lat:5, lng:-75.5})
    const center = useMemo(() => (selected),[])

    return (

        <>
            <div className='border-4 border-gray-500 rounded shadow-md shadow-gray-500' style={{width:900 + 'px', height: 500 + 'px'}}>

                <div>
                    <PlacesAutocomplete setSelected={setSelected}/>
                </div>

                <GoogleMap zoom={8} center={center} mapContainerStyle={{width:100 + '%', height: 100 + '%'}}>
                    <MarkerF position={selected}/>
                </GoogleMap>
            </div>
        </>



    )
}