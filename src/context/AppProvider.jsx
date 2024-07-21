import {createContext, useState} from "react";
import {options as optionsDB } from "../data/options.js";
import {adminOptions as adminOptionsDB} from "../data/admin_options.js";
import {countries} from "../data/countries.js";
import {states as statesDB} from "../data/states.js";
import {towns as townsDB} from "../data/towns.js";
import {serviceTypes} from "../data/service_types.js";
import {unitMeasures} from "../data/unit_measures.js";
import {sidebarOptions as sidebarOptionsDB} from "../data/sidebar_options.js";
import {useServices} from "../hooks/useServices.js";
import {useBaggerQuotations} from "../hooks/useBaggerQuotations.js";
import {useServiceOptions} from "../hooks/useServiceOptions.js";
import {useSupplies} from "../hooks/useSupplies.js";
import {useBaggerProducts} from "../hooks/useBaggerProducts.js";


////////////////////////////////////////////////

const AppContext = createContext();

/////////////////////////////////////////////////////

const AppProvider = ({children}) => {

    //////////////  ===>>> useState desde aca <<<=== //////////////////

    const [options, setOptions] = useState(optionsDB);
    const [sidebarOptions, setSidebarOptions] = useState(sidebarOptionsDB);
    const [operators, setOperators] = useState([]);
    const [instruments, setInstruments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [adminOptions, setAdminOptions] = useState(adminOptionsDB);
    const [selectedSidebarOption, setSelectedSidebarOption] = useState({});
    const [selectedSidebarSubOption, setSelectedSidebarSubOption] = useState({});
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
    const [selectedService, setSelectedService] = useState({})
    const [countryQuotationSelected, setCountryQuotationSelected] = useState({})
    const [stateQuotationSelected, setStateQuotationSelected] = useState({})
    const [townQuotationSelected, setTownQuotationSelected] = useState({})
    const [velocityOptionSelected, setVelocityOptionSelected] = useState({})
    const [packingMaterialSelected, setPackingMaterialSelected] = useState({})
    const [manufacturerMaterialSelected, setManufacturerMaterialSelected] = useState({})
    const [brandsSelected, setBrandsSelected] = useState([])
    const [manufacturerMaterialAdditionalSelected, setManufacturerMaterialAdditionalSelected] = useState({})
    const [additionalProductsSelected, setAdditionalProductsSelected] = useState([])
    const [selectedVelocityServiceOption, setSelectedVelocityServiceOption] = useState({})
    const [selectedPackingMaterialServiceOption, setSelectedPackingMaterialServiceOption] = useState({})


    const handleSidebarOption = (option) => {
        setSelectedSidebarOption(option)
        setSelectedSidebarSubOption({})
    }

    const handleSidebarSubOption = (option) => {
        setSelectedSidebarSubOption(option)
    }

    const handleAdminOptionClick = id => {
        const option = adminOptions.filter(option => option.id === id)[0]
        setCurrentAdminOption(option)
    }

    const handleSelectState = (countryId) => {

        setStates(statesDB.filter(state => state.fk_country === countryId))
        setTowns([])

    }

    const handleSelectTown = (stateId) => {

        setTowns(townsDB.filter(town => town.fk_state === stateId))
    }

    const handleSaveForm = (serviceRequestForm1) => {
        setServiceRequest(serviceRequestForm1)
        setForm1(serviceRequestForm1)
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

    ////////////////////////////////////////////////////////////////////////////////

    const handleFirstOptionSelected = (optionSelected) => {
        setVelocityOptionSelected(optionSelected)
    }

    const handlePackingMaterialSelected = (materialSelected) => {
        setPackingMaterialSelected(materialSelected)
    }

    const handleManufacturerMaterialSelected = (materialSelected) => {
        setManufacturerMaterialSelected(materialSelected)
    }

    const handleManufacturerMaterialAdditionalSelected = (materialSelected) => {
        setManufacturerMaterialAdditionalSelected(materialSelected)
    }

    const handleBrandsSelected = ({icon,description,...selectedBrand}) => {

        !brandsSelected.some(brand => brand.type === selectedBrand.type) ?
            setBrandsSelected([...brandsSelected, {...selectedBrand}]) :
            setBrandsSelected([...brandsSelected.filter(brand => brand.type !== selectedBrand.type), {...selectedBrand}])

    }

    const handleAdditionalProductSelected = ({icon, selectedProductId, manufacturingMaterials, description, ...productSelected}) => {

        !additionalProductsSelected.some(product => product.id === productSelected.id) ?
            setAdditionalProductsSelected([...additionalProductsSelected, {...productSelected}]) :
            setAdditionalProductsSelected(additionalProductsSelected.filter(product => product.id !== productSelected.id))
    }


    const handleSelectQuotationCountry = (countryId,change) => {

        const countrySelected = countries.filter(country => country.id === countryId)
        setCountryQuotationSelected(countrySelected.length > 0 ? countrySelected[0] : {})
        handleSelectState(countryId)

        if (change){
            setStateQuotationSelected({})
            setTownQuotationSelected({})
        }

    }

    const handleSelectQuotationState = (stateId,change) => {

        const stateSelected = statesDB.filter(state => state.id === stateId)
        setStateQuotationSelected(stateSelected.length > 0 ? stateSelected[0] : {})
        handleSelectTown(stateId)

        if (change){
            setTownQuotationSelected({})
        }
    }

    const handleSelectQuotationTown = (townId) => {

        const townSelected = townsDB.filter(town => town.id === townId)
        setTownQuotationSelected(townSelected.length > 0 ? townSelected[0] : {})
    }


    const {services,
        getAllServices,
        serviceSelectedData,
        getServiceById} = useServices();

    const {saveNewBaggerQuotation,
        allBaggerQuotations,
        getAllBaggerQuotation,
        getBaggerQuotationById,
        baggerQuotationDataSelected,
        electronicSupplies,
        pneumaticSupplies,
        electronicSuppliesPriceResult,
        pneumaticSuppliesPriceResult,
        newBaggerQuotationLength,
        totalQuotationPrice,
        setTotalQuotationPrice,
        handleSetNewBaggerQuotationLength} = useBaggerQuotations();

    const {serviceOptionsByType,
        getServiceOptionsByType} = useServiceOptions();

    const {saveNewSupply,getAllSupplies,allSupplies} = useSupplies();

    const {saveNewBaggerProduct} = useBaggerProducts();

    return (

        <AppContext.Provider
            value={{
                options,
                selectedSidebarOption,
                setSelectedSidebarOption,
                handleSidebarOption,
                selectedSidebarSubOption,
                setSelectedSidebarSubOption,
                handleSidebarSubOption,
                adminOptions,
                currentAdminOption,
                setCurrentAdminOption,
                handleAdminOptionClick,
                countries,
                sidebarOptions,
                states,
                towns,
                serviceTypes,
                unitMeasures,
                handleSelectState,
                handleSelectTown,
                handleSaveForm,
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
                setValidationErrors,
                selectedService,
                setSelectedService,
                velocityOptionSelected,
                setVelocityOptionSelected,
                handleFirstOptionSelected,
                handlePackingMaterialSelected,
                packingMaterialSelected,
                manufacturerMaterialSelected,
                handleManufacturerMaterialSelected,
                additionalProductsSelected,
                handleAdditionalProductSelected,
                handleManufacturerMaterialAdditionalSelected,
                manufacturerMaterialAdditionalSelected,
                countryQuotationSelected,
                setCountryQuotationSelected,
                stateQuotationSelected,
                setStateQuotationSelected,
                townQuotationSelected,
                setTownQuotationSelected,
                handleSelectQuotationCountry,
                handleSelectQuotationState,
                handleSelectQuotationTown,
                handleBrandsSelected,
                brandsSelected,
                services,
                getAllServices,
                serviceSelectedData,
                getServiceById,
                saveNewBaggerQuotation,
                allBaggerQuotations,
                getAllBaggerQuotation,
                getBaggerQuotationById,
                baggerQuotationDataSelected,
                electronicSupplies,
                pneumaticSupplies,
                electronicSuppliesPriceResult,
                pneumaticSuppliesPriceResult,
                newBaggerQuotationLength,
                handleSetNewBaggerQuotationLength,
                serviceOptionsByType,
                getServiceOptionsByType,
                saveNewSupply,
                getAllSupplies,
                allSupplies,
                saveNewBaggerProduct,
                selectedVelocityServiceOption,
                setSelectedVelocityServiceOption,
                selectedPackingMaterialServiceOption,
                setSelectedPackingMaterialServiceOption,
                totalQuotationPrice,
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
