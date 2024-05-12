import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import "@reach/combobox/styles.css"
import {useEffect} from "react";
import useApp from "../../hooks/useApp.js";

export default function PlacesAutocomplete({setSelected}) {

    const {serviceSelected} = useApp()

    const {service_address,
        country_name,
        state_name,
        town_name} = serviceSelected

    const finalAddress = `${service_address} - ${town_name} - ${state_name} / ${country_name}`

    const {
        ready,
        value,
        setValue,
        suggestions: { status,data},
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async (address) => {

        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        setSelected({lat, lng})
    }

    useEffect(() => {
        handleSelect(finalAddress)
    },[])

    return (
        <div className='flex justify-center'>
            <Combobox onSelect={handleSelect} className='absolute z-50'>
                <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready} className='w-full md:w-96 md:p-3 p-2 rounded md:mt-2 mt-14 bg-gray-900 text-white' placeholder='buscar'/>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                        data.map(({place_id, description}) => (
                            <ComboboxOption key={place_id} value={description}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}