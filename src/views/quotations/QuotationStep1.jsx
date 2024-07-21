import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {useNavigate} from "react-router-dom";
import ProductOptionsSection from "../../components/products/ProductOptionsSection.jsx";


export default function QuotationStep1() {


    const {selectedService,
        setSelectedService,
        handleFirstOptionSelected,
        velocityOptionSelected,
        services,
        getAllServices,
        serviceSelectedData,
        getServiceById} = useApp();


    const navigate = useNavigate()

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

        handleFirstOptionSelected(optionSelected)

        navigate('/quot/step_2')
    }

    const handleChangeSelectedService = (service) => {

        setSelectedService(service)

        getServiceById(service.id)

    }


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

            { Object.entries(serviceSelectedData).length !== 0 && (
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
                                    optionSelected={velocityOptionSelected.id}
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
