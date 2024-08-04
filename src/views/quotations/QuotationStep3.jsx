import {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {useNavigate} from "react-router-dom";
import ProductOptionsSection from "../../components/products/ProductOptionsSection.jsx";
import {toast} from "react-toastify";


export default function QuotationStep3() {


    const {serviceSelectedData,
        handleAdditionalProductSelected,
        additionalProductsSelected,
        handleManufacturerMaterialAdditionalSelected,
        manufacturerMaterialAdditionalSelected} = useApp();

    const navigate = useNavigate()

    const handleSelectAdditional = (optionSelected) => {

        handleAdditionalProductSelected(optionSelected)
    }

    const handleManufacturerMaterial = (optionSelected) => {

        handleManufacturerMaterialAdditionalSelected(optionSelected)
        navigate('/quot/step_4')
    }

    useEffect(() => {
        if (serviceSelectedData === null) {

            toast.info('Sigue los pasos para conocer lo mejor de nuestro portafolio')
            navigate('/quot/step_1')
        }
    }, []);

    useEffect(() => {

        window.scrollBy({
            top: 500,
            left: 0,
            behavior: "smooth",
        })

    }, [handleAdditionalProductSelected]);

    return (
        <>

            <Transition
                as={'div'}
                appear={true}
                show={true}
                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                enterFrom="opacity-0 -translate-x-6"
                enterTo="opacity-100 translate-x-0"
                leave="transition-all ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="bg-white py-5 sm:py-5">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <ProductOptionsSection
                            title1={serviceSelectedData !== null && serviceSelectedData.description}
                            title2={serviceSelectedData !== null && serviceSelectedData.steps[5].title}
                            title3={'Presiona sobre las opciones deseadas para adicionarlas'}
                            iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[5].options}
                            onClickFunction={handleSelectAdditional}
                            optionSelected={null}
                            arraySelection={additionalProductsSelected}
                        >
                        </ProductOptionsSection>


                        {additionalProductsSelected.length > 0 && (

                            <Transition
                                as={'div'}
                                appear={true}
                                show={true}
                                enter="transition-all ease-in-out duration-500 delay-[200ms]"
                                enterFrom="opacity-0 translate-y-6"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition-all ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >

                                <div>
                                    <ProductOptionsSection
                                        title2={'Material de fabricación para :'}
                                        title3={'Selecciona una opción'}
                                        listTitle={additionalProductsSelected}
                                        iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[2].options}
                                        onClickFunction={handleManufacturerMaterial}
                                        optionSelected={manufacturerMaterialAdditionalSelected.id}
                                        arraySelection={null}
                                    >
                                    </ProductOptionsSection>
                                </div>

                            </Transition>

                        )}

                    </div>
                </div>
            </Transition>
        </>
    );
}
