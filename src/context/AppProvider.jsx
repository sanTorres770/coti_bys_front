import { createContext, useState } from "react";
import {options as optionsDB } from "../data/options.js";
import {adminOptions as adminOptionsDB} from "../data/admin_options.js";
import {countries} from "../data/countries.js";
import {states as statesDB} from "../data/states.js";
import {towns as townsDB} from "../data/towns.js";
import {serviceTypes} from "../data/service_types.js";
import {unitMeasures} from "../data/unit_measures.js";


////////////////////////////////////////////////

const AppContext = createContext();

/////////////////////////////////////////////////////

const AppProvider = ({children}) => {

    //////////////  ===>>> useState desde aca <<<=== //////////////////

    const [options, setOptions] = useState(optionsDB);
    const [operators, setOperators] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [adminOptions, setAdminOptions] = useState(adminOptionsDB);
    const [currentOption, setCurrentOption] = useState({});
    const [currentAdminOption, setCurrentAdminOption] = useState({});
    const [states, setStates] = useState([])
    const [towns, setTowns] = useState([])
    const [serviceRequest, setServiceRequest] = useState({})
    const [form1, setForm1] = useState({})
    const [form2, setForm2] = useState({})
    const [servicesList, setServicesList] = useState([])
    const [assignationsList, setAssignationsList] = useState([])
    const [evidencesList, setEvidencesList] = useState([])
    const [newAssignationSelected, setNewAssignationSelected] = useState([])
    const [assignationServiceSelected, setAssignationServiceSelected] = useState([])
    const [serviceSelected, setServiceSelected] = useState({})
    const [assignationsModal, setAssignationsModal] = useState(false)
    const [schedulingServiceModal, setSchedulingServiceModal] = useState(false)
    const [finishServiceModal, setFinishServiceModal] = useState(false)
    const [schedulingService, setSchedulingService] = useState({})
    const [schedulingDate, setSchedulingDate] = useState('')
    const [images, setImages] = useState([])
    const [sidebarVisible, setSidebarVisible] = useState(true)
    const [idSelected, setIdSelected] = useState('')
    const [filterOptionsSelected, setFilterOptionsSelected] = useState([])
    const [validationErrors, setValidationErrors] = useState({})

    const handleOptionClick = id => {
        const option = options.filter(option => option.id === id)[0]
        setCurrentOption(option)
    }

    const handleAdminOptionClick = id => {
        const option = adminOptions.filter(option => option.id === id)[0]
        setCurrentAdminOption(option)
    }

    const handleSelectState = countryId => {
        setStates(statesDB.filter(state => state.fk_country === countryId))
        setTowns([])

    }

    const handleSelectTown = stateId => {
        setTowns(townsDB.filter(town => town.fk_state === stateId))
    }

    const handleSaveForm1 = (serviceRequestForm1) => {
        setServiceRequest(serviceRequestForm1)
        setForm1(serviceRequestForm1)
    }

    const handleSaveForm2 = (serviceRequestForm2) => {
        setServiceRequest(serviceRequestForm2)
        setForm2(serviceRequestForm2)
    }

    const handleClickAssignationsModal = () => {
        setAssignationsModal(!assignationsModal)
    }

    const handleClickSchedulingServiceModal = () => {
        setSchedulingServiceModal(!schedulingServiceModal)
    }

    const handleClickFinishServiceModal = () => {
        setFinishServiceModal(!finishServiceModal)
    }

    const handleAddOperator = (operatorSelected) => {
        setNewAssignationSelected([...newAssignationSelected, {...operatorSelected}])
        setAssignationServiceSelected([...assignationServiceSelected, operatorSelected])
        operators.forEach(operator => {
            if (operator.operator_id === operatorSelected.operator_id){
                operator.disponible = false
            }
        })
    }

    const handleClickSidebarVisibility = () => {
        setSidebarVisible(!sidebarVisible)
    }


    return (

        <AppContext.Provider
            value={{
                options,
                currentOption,
                setCurrentOption,
                handleOptionClick,
                adminOptions,
                currentAdminOption,
                setCurrentAdminOption,
                handleAdminOptionClick,
                countries,
                states,
                towns,
                serviceTypes,
                unitMeasures,
                handleSelectState,
                handleSelectTown,
                handleSaveForm1,
                handleSaveForm2,
                serviceRequest,
                setServiceRequest,
                form1,
                form2,
                setForm1,
                setForm2,
                servicesList,
                setServicesList,
                serviceSelected,
                setServiceSelected,
                assignationsList,
                setAssignationsList,
                evidencesList,
                setEvidencesList,
                operators,
                setOperators,
                instruments,
                setInstruments,
                customers,
                setCustomers,
                assignationsModal,
                finishServiceModal,
                setFinishServiceModal,
                handleClickFinishServiceModal,
                handleClickAssignationsModal,
                schedulingServiceModal,
                handleClickSchedulingServiceModal,
                handleAddOperator,
                newAssignationSelected,
                setNewAssignationSelected,
                assignationServiceSelected,
                setAssignationServiceSelected,
                schedulingService,
                setSchedulingService,
                schedulingDate,
                setSchedulingDate,
                images,
                setImages,
                sidebarVisible,
                handleClickSidebarVisibility,
                idSelected,
                setIdSelected,
                filterOptionsSelected,
                setFilterOptionsSelected,
                validationErrors,
                setValidationErrors
            }}
        >
            {children}
        </AppContext.Provider>

    )
}

export {
    AppProvider
}

export default AppContext
