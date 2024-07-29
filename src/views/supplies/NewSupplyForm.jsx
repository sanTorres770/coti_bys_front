import InputForm from "../../components/layout/InputForm.jsx";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {createRef, useEffect, useState} from "react";
import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function NewSupplyForm() {

    const {validationErrors,
        serviceOptionsByType,
        saveNewSupply,
        getServiceOptionsByType,
        selectedSidebarOption,
        setSelectedSidebarSubOption} = useApp();

    const navigate = useNavigate()

    const {formatPriceToCurrency} = commonConfig()

    const descriptionRef = createRef()
    const referenceRef = createRef()
    const sourceRef = createRef()

    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedMakerServiceOption, setSelectedMakerServiceOption] = useState({})


    const handleFocusOutTotalPriceInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(totalPrice))

    }

    const handleFocusInTotalPriceInput = (e) => {
        e.target.value = totalPrice

    }

    const handleChangeTotalPriceInput = (e) => {
        setTotalPrice(Number(e.target.value))
    }


    const handleSubmit = e => {

        e.preventDefault()

        const newSupply = {
            description: descriptionRef.current.value,
            reference: referenceRef.current.value,
            source: sourceRef.current.value,
            totalPrice: totalPrice,
            supplyAmount: 1,
            maker: selectedMakerServiceOption,
            active: true
        }

        saveNewSupply(newSupply).then((response) => {

            if (response){
                toast.success('El insumo se creó correctamente!')

                const buttonToClose = document.getElementById(`sidebar_option_${selectedSidebarOption.id}`);

                if (buttonToClose !== null){
                    buttonToClose.click()
                }

                setSelectedSidebarSubOption({})
                navigate('/dashboard')
            }else {
                toast.error('Error en el proceso.')
            }

        })



    }

    useEffect(() => {
        getServiceOptionsByType("ELECTRONICA,NEUMATICA,ELECTRICA")
    }, []);

    return (

        <div className="overflow-hidden overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-md m-5">
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
                <form className='w-full p-6' onSubmit={handleSubmit} noValidate>
                    <div className="space-y-10">
                        <div className="border-b border-gray-900/10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Creación de insumos
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Ingrese la información de los insumos a utilizar en la fabricación de los productos.
                            </p>
                            <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <InputForm
                                        validationErrors={validationErrors ? validationErrors.businessName ? validationErrors.businessName : null : null}
                                        inputId={'description'}
                                        type={'text'}
                                        labelValue={'Descripción *'}
                                        reference={descriptionRef}
                                        placeholder={'Descripción'}
                                    >
                                    </InputForm>
                                </div>

                                <div className="sm:col-span-2">
                                    <InputForm
                                        validationErrors={validationErrors ? validationErrors.contactName ? validationErrors.contactName : null : null}
                                        inputId={'reference'}
                                        type={'text'}
                                        labelValue={'Referencia *'}
                                        placeholder={'Referencia'}
                                        reference={referenceRef}
                                    >
                                    </InputForm>
                                </div>

                                <div className="sm:col-span-2">
                                    <SelectListBox
                                        data={serviceOptionsByType}
                                        labelText={'Fabricante *'}
                                        selected={selectedMakerServiceOption}
                                        setSelected={setSelectedMakerServiceOption}
                                        displayAttribute={'name'}
                                    >
                                    </SelectListBox>
                                </div>

                                <div className="sm:col-span-3">
                                    <InputForm
                                        validationErrors={validationErrors ? validationErrors.contactName ? validationErrors.contactName : null : null}
                                        inputId={'source'}
                                        type={'text'}
                                        labelValue={'Fuente/proveedor'}
                                        placeholder={'Fuente/proveedor'}
                                        reference={sourceRef}
                                    >
                                    </InputForm>
                                </div>

                                <div className="sm:col-span-3">
                                    <InputForm inputId={'totalPrice'}
                                               validationErrors={validationErrors ? validationErrors.address ? validationErrors.address : null : null}
                                               type={'text'}
                                               labelValue={'Precio bruto *'}
                                               placeholder={'Precio bruto'}
                                               onBlurFunction={handleFocusOutTotalPriceInput}
                                               onFocusFunction={handleFocusInTotalPriceInput}
                                               onChangeFunction={handleChangeTotalPriceInput}
                                    >
                                    </InputForm>
                                </div>
                            </div>

                        </div>
                        <div className="sm:col-span-1 mb-5">
                            <button
                                type="submit"
                                onClick={() => handleSubmit}
                                className="flex w-full justify-center rounded-md bg-indigo-600 mt-0 md:mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Crear insumo
                            </button>
                        </div>
                    </div>
                </form>
            </Transition>
        </div>

    );
}