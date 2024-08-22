import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {useLocation, useNavigate} from "react-router-dom";
import ProductOptionsSection from "../../components/products/ProductOptionsSection.jsx";


export default function QuotationStep1() {


    const {handleVelocityOptionSelected,
        velocityOptionSelected,
        services,
        getAllServices,
        isExternEntry,
        setIsExternEntry,
        serviceSelectedData,
        setServiceSelectedData,
        getServiceById,
        selectedService,
        setSelectedService,
        setVelocityOptionSelected,
        setPackingMaterialSelected,
        setManufacturerMaterialSelected,
        setBrandsSelected,
        setManufacturerMaterialAdditionalSelected,
        setAdditionalProductsSelected,
        setCountryQuotationSelected,
        setStateQuotationSelected,
        setTownQuotationSelected} = useApp();


    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getAllServices()
    }, []);


    useEffect(() => {

        window.scrollBy({
            top: 1000,
            left: 0,
            behavior: "smooth",
        })

    }, [serviceSelectedData]);

    const handleContinue = (optionSelected) => {

        handleVelocityOptionSelected(optionSelected)

        navigate('/quot/step_2')
    }

    const handleChangeSelectedService = (service) => {

        setSelectedService(service)

        getServiceById(service.id)

    }

    useEffect(() => {
        setSelectedService({})
        setServiceSelectedData(null)
        setVelocityOptionSelected(null)
        setPackingMaterialSelected(null)
        setManufacturerMaterialSelected(null)
        setBrandsSelected([])
        setManufacturerMaterialAdditionalSelected([])
        setAdditionalProductsSelected([])
        setCountryQuotationSelected(null)
        setStateQuotationSelected(null)
        setTownQuotationSelected(null)

        if (location.pathname === '/quot/ext_step_1'){

            setIsExternEntry(true)
        }

    }, []);


    return (

        <>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">

                <div className="sm:col-span-1">
                    <SelectListBox data={services}
                                   labelText={'Producto a fabricar *'}
                                   selected={selectedService}
                                   setSelected={handleChangeSelectedService}
                                   displayAttribute={'name'}
                    ></SelectListBox>
                </div>

            </div>

            {serviceSelectedData !== null && (
                <>
                    <Transition
                        appear={true}
                        show={true}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-white py-5 sm:py-5">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                                <ProductOptionsSection
                                    title1={serviceSelectedData.description}
                                    title2={serviceSelectedData.steps[0].title}
                                    title3={'Presiona sobre la opción que mejor se acomode a tus necesidades'}
                                    iterationOptions={serviceSelectedData.steps[0].options}
                                    onClickFunction={handleContinue}
                                    optionSelected={velocityOptionSelected !== null && velocityOptionSelected.id}
                                    arraySelection={null}
                                >
                                </ProductOptionsSection>

                            </div>
                        </div>

                    </Transition>
                </>
            )}
        </>
    );
}
