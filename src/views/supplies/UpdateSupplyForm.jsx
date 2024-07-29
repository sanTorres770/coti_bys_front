import {createRef, useEffect, useState} from "react";
import useApp from "../../hooks/useApp.js";
import {Transition} from "@headlessui/react";
import ComboboxSelect from "../../components/combobox/ComboboxSelect.jsx";
import InputForm from "../../components/layout/InputForm.jsx";
import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export default function UpdateSupplyForm() {

    const {validationErrors,
        serviceOptionsByType,
        getServiceOptionsByType,
        updateSupply,
        getAllSupplies,
        allSupplies,
        selectedSidebarOption,
        setSelectedSidebarSubOption} = useApp();

    const [supplyData, setSupplyData] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [makerOptionEdit, setMakerOptionEdit] = useState({})


    const {id,
        description,
        reference,
        source,
        maker,
        totalPrice:totalPriceEdit} = supplyData

    const navigate = useNavigate()

    const {formatPriceToCurrency} = commonConfig()

    const descriptionRef = createRef()
    const referenceRef = createRef()
    const sourceRef = createRef()


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

        const editSupply = {
            id: id !== undefined ? id : null,
            description: descriptionRef.current.value,
            reference: referenceRef.current.value,
            source: sourceRef.current.value,
            totalPrice: totalPrice,
            supplyAmount: 1,
            maker: makerOptionEdit,
            active: true
        }


        updateSupply(editSupply,id).then((response) => {

            if (response){
                toast.success('El insumo se actualizó correctamente!')

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
        getAllSupplies()

    }, []);

    useEffect(() => {
        setTotalPrice(totalPriceEdit || 0)
        setMakerOptionEdit(maker)
    }, [supplyData]);


    return (

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
                                    Actualización de insumo
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Actualice la información del insumos seleccionado.
                                </p>

                                <div className='w-5/6'>
                                    <ComboboxSelect data={allSupplies}
                                                    queryAttribute={'description'}
                                                    displayAttribute={'description'}
                                                    displaySimpleAttribute={'reference'}
                                                    displayCompoundAttribute={['maker', 'name']}
                                                    selected={supplyData}
                                                    setSelected={setSupplyData}
                                                    placeholder={'Búsqueda de insumos'}>
                                    </ComboboxSelect>
                                </div>

                                <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                    <div className="sm:col-span-2">
                                        <InputForm
                                            validationErrors={validationErrors ? validationErrors.businessName ? validationErrors.businessName : null : null}
                                            inputId={'description'}
                                            type={'text'}
                                            labelValue={'Descripción *'}
                                            reference={descriptionRef}
                                            placeholder={'Descripción'}
                                            defaultValue={description}
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
                                            defaultValue={reference}
                                        >
                                        </InputForm>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <SelectListBox
                                            data={serviceOptionsByType}
                                            labelText={'Fabricante *'}
                                            selected={makerOptionEdit}
                                            setSelected={setMakerOptionEdit}
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
                                            defaultValue={source}
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
                                                   defaultValue={totalPriceEdit !== undefined ? formatPriceToCurrency(totalPriceEdit) : 0}
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
                                    Actualizar insumo
                                </button>
                            </div>
                        </div>
                    </form>
                </Transition>
            </div>


        </Transition>


    );
}