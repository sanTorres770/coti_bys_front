import {Fragment, useEffect} from "react";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {useNavigate} from "react-router-dom";
import ProductOptionsSection from "../../components/products/ProductOptionsSection.jsx";
import {toast} from "react-toastify";


export default function QuotationStep2() {


    const {
        serviceSelectedData,
        velocityOptionSelected,
        handlePackingMaterialSelected,
        packingMaterialSelected,
        handleManufacturerMaterialSelected,
        manufacturerMaterialSelected,
        handleBrandsSelected,
        brandsSelected
    } = useApp();

    const navigate = useNavigate()

    useEffect(() => {

        window.scrollBy({
            top: 5,
            left: 0,
            behavior: "smooth",
        })

    }, []);


    const handlePackingMaterial = (optionSelected) => {

        handlePackingMaterialSelected(optionSelected)

    }

    const handleBrands = (optionSelected) => {

        handleBrandsSelected(optionSelected)

        let nextPath = ''

        serviceSelectedData.steps[5].options.length === 0 ? nextPath = '/quot/step_4' : nextPath = '/quot/step_3'

        if (brandsSelected.length + 1 >= 2) {
            navigate(nextPath)
        }

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

    }, [handlePackingMaterial]);

    return (
        <>

            <Transition
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
                            title2={serviceSelectedData !== null && serviceSelectedData.steps[1].title}
                            title3={velocityOptionSelected !== null && velocityOptionSelected.name}
                            iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[1].options}
                            onClickFunction={handlePackingMaterial}
                            optionSelected={packingMaterialSelected !== null && packingMaterialSelected.id}
                            arraySelection={null}
                        >
                        </ProductOptionsSection>


                        {packingMaterialSelected !== null && (

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
                                        title2={`Material de fabricación ${serviceSelectedData !== null && serviceSelectedData.description}:`}
                                        title3={'Seleccione una opción'}
                                        iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[2].options}
                                        onClickFunction={handleManufacturerMaterialSelected}
                                        optionSelected={manufacturerMaterialSelected !== null && manufacturerMaterialSelected.id}
                                        arraySelection={null}
                                    >
                                    </ProductOptionsSection>

                                    <ProductOptionsSection
                                        title2={serviceSelectedData !== null && serviceSelectedData.steps[3].title}
                                        title3={'Seleccione una opción'}
                                        iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[3].options.filter(option => option.id !== '12')}
                                        onClickFunction={handleBrands}
                                        optionSelected={null}
                                        arraySelection={brandsSelected}
                                    >
                                    </ProductOptionsSection>

                                    <ProductOptionsSection
                                        title2={serviceSelectedData !== null && serviceSelectedData.steps[4].title}
                                        title3={'Seleccione una opción'}
                                        iterationOptions={serviceSelectedData !== null && serviceSelectedData.steps[4].options.filter(option => option.id === '10')}
                                        onClickFunction={handleBrands}
                                        optionSelected={null}
                                        arraySelection={brandsSelected}
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path fill-rule="evenodd"
          d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
          clip-rule="evenodd"/>
</svg>


