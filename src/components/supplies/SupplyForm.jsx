import ComboboxSelect from "../combobox/ComboboxSelect.jsx";
import InputForm from "../layout/InputForm.jsx";
import SelectListBox from "../layout/SelectListBox.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";
import useApp from "../../hooks/useApp.js";
import {useEffect} from "react";
import FormSubmitButton from "../button/FormSubmitButton.jsx";
import ValidationFormAlert from "../alerts/ValidationFormAlert.jsx";
import LoadingAlert from "../alerts/LoadingAlert.jsx";

export default function SupplyForm({supplyData,setSupplyData,handleSubmit,isEdit,allSupplies,validationErrors,descriptionRef,referenceRef,sourceRef,totalPrice,setTotalPrice,makerOption,setMakerOption,buttonValue,errors,isLoading}) {

    const {serviceOptionsByType,
        getServiceOptionsByType,
        setValidationErrors} = useApp();

    const {formatPriceToCurrency} = commonConfig()

    const handleFocusOutTotalPriceInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(totalPrice))

    }

    const handleFocusInTotalPriceInput = (e) => {
        e.target.value = totalPrice

    }

    const handleChangeTotalPriceInput = (e) => {
        setTotalPrice(isNaN(e.target.value) ? 0 : Number(e.target.value))
    }

    useEffect(() => {
        getServiceOptionsByType("ELECTRONICA,NEUMATICA,ELECTRICA")
        setValidationErrors({})
    }, []);

    return (
        <form className='w-full p-6' onSubmit={handleSubmit} noValidate>

            {errors  && (errors.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>))}

            <div className="space-y-10">
                <div className="border-b border-gray-900/10">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {isEdit ? 'Actualización de insumo' : 'Creación de insumos'}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {isEdit ? 'Actualice la información del insumo seleccionado.' : 'Ingrese la información de los insumos a utilizar en la fabricación de los productos.'}
                    </p>


                    {isEdit && (
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
                    )}

                    <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-2">
                            <InputForm
                                validationErrors={validationErrors ? validationErrors.description ? validationErrors.description : null : null}
                                inputId={'description'}
                                type={'text'}
                                labelValue={'Descripción *'}
                                reference={descriptionRef}
                                placeholder={'Descripción'}
                                defaultValue={supplyData ? supplyData.description : null}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-2">
                            <InputForm
                                validationErrors={validationErrors ? validationErrors.reference ? validationErrors.reference : null : null}
                                inputId={'reference'}
                                type={'text'}
                                labelValue={'Referencia *'}
                                placeholder={'Referencia'}
                                reference={referenceRef}
                                defaultValue={supplyData ? supplyData.reference : null}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-2">
                            <SelectListBox
                                validationErrors={validationErrors ? validationErrors.maker ? validationErrors.maker : null : null}
                                data={serviceOptionsByType}
                                labelText={'Fabricante *'}
                                selected={makerOption}
                                setSelected={setMakerOption}
                                displayAttribute={'name'}
                            >
                            </SelectListBox>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm
                                inputId={'source'}
                                type={'text'}
                                labelValue={'Fuente/proveedor'}
                                placeholder={'Fuente/proveedor'}
                                reference={sourceRef}
                                defaultValue={supplyData ? supplyData.source : null}
                            >
                            </InputForm>
                        </div>

                        <div className="sm:col-span-3">
                            <InputForm inputId={'totalPrice'}
                                       validationErrors={validationErrors ? validationErrors.totalPrice ? validationErrors.totalPrice : null : null}
                                       type={'text'}
                                       labelValue={'Precio bruto *'}
                                       placeholder={'Precio bruto'}
                                       onBlurFunction={handleFocusOutTotalPriceInput}
                                       onFocusFunction={handleFocusInTotalPriceInput}
                                       onChangeFunction={handleChangeTotalPriceInput}
                                       defaultValue={totalPrice ? formatPriceToCurrency(totalPrice) : null}
                            >
                            </InputForm>
                        </div>
                    </div>

                </div>
                <div className="sm:col-span-1 mb-5">
                    {!isLoading ?

                        <FormSubmitButton value={buttonValue} handleSubmit={handleSubmit}></FormSubmitButton>

                        :

                        <LoadingAlert/>
                    }
                </div>
            </div>
        </form>
    );
}