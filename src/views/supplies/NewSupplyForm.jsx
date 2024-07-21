import InputForm from "../../components/layout/InputForm.jsx";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {createRef, useEffect, useState} from "react";
import SelectListBox from "../../components/layout/SelectListBox.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";

export default function NewSupplyForm() {

    useEffect(() => {
        getServiceOptionsByType("ELECTRONICA,NEUMATICA")
    }, []);


    const {validationErrors,
        serviceOptionsByType,
        saveNewSupply,
        getServiceOptionsByType} = useApp();

    const {formatPriceToCurrency} = commonConfig()

    const descriptionRef = createRef()
    const referenceRef = createRef()
    const urlRef = createRef()

    const [unitPrice, setUnitPrice] = useState(0)
    const [freightPrice, setFreightPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedMakerServiceOption, setSelectedMakerServiceOption] = useState({})

    const handleCalculateTotalPrice = (e) => {


        if (unitPrice !== 0 && freightPrice !== 0) {

            const totalPrice = Number(unitPrice) + Number(freightPrice)

            e.target.value = formatPriceToCurrency(Number(totalPrice))

            setTotalPrice(totalPrice)


        }else {

            setFreightPrice(0)
            setUnitPrice(0)
            setTotalPrice(0)
            document.getElementById('unitPrice').focus()


        }


    }

    const handleFocusOutUnitPriceInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(unitPrice))

    }

    const handleFocusInUnitPriceInput = (e) => {
        e.target.value = unitPrice

    }

    const handleChangeUnitPriceInput = (e) => {
        setUnitPrice(Number(e.target.value))
    }

    const handleFocusOutFreightPriceInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(freightPrice))
    }

    const handleFocusInFreightPriceInput = (e) => {
        e.target.value = freightPrice

    }

    const handleChangeFreightPriceInput = (e) => {
        setFreightPrice(Number(e.target.value))
    }

    const handleSubmit = e => {

        e.preventDefault()

        e.target.focus()

        const newSupply = {
            description: descriptionRef.current.value,
            reference: referenceRef.current.value,
            url: urlRef.current.value,
            unitPrice: unitPrice,
            freightPrice: freightPrice,
            totalPrice: totalPrice,
            maker: selectedMakerServiceOption,
            supplyAmount: 0,
            active: true
        }

        saveNewSupply(newSupply)

    }

    return (

        <div className="overflow-hidden overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-md m-5">
            <form className='w-full p-6' onSubmit={handleSubmit} noValidate>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Creación de insumos</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Ingrese la información de los insumos a utilizar en la fabricación de los productos.
                        </p>

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

                            <>

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

                                    <div className="sm:col-span-6">
                                        <InputForm
                                            validationErrors={validationErrors ? validationErrors.contactName ? validationErrors.contactName : null : null}
                                            inputId={'url'}
                                            type={'text'}
                                            labelValue={'Url *'}
                                            placeholder={'Url'}
                                            reference={urlRef}
                                        >
                                        </InputForm>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <InputForm inputId={'unitPrice'}
                                                   validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                                   type={'text'}
                                                   labelValue={'Valor unitario *'}
                                                   placeholder={'Valor unitario'}
                                                   onChangeFunction={handleChangeUnitPriceInput}
                                                   onFocusFunction={handleFocusInUnitPriceInput}
                                                   onBlurFunction={handleFocusOutUnitPriceInput}
                                        >
                                        </InputForm>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <InputForm inputId={'freight'}
                                                   validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                                   type={'text'}
                                                   labelValue={'Valor flete *'}
                                                   placeholder={'Valor flete'}
                                                   onChangeFunction={handleChangeFreightPriceInput}
                                                   onFocusFunction={handleFocusInFreightPriceInput}
                                                   onBlurFunction={handleFocusOutFreightPriceInput}
                                        >
                                        </InputForm>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <InputForm inputId={'totalPrice'}
                                                   validationErrors={validationErrors ? validationErrors.address ? validationErrors.address : null : null}
                                                   type={'text'}
                                                   labelValue={'Valor total *'}
                                                   readonly={true}
                                                   placeholder={'Valor total'}
                                                   onFocusFunction={handleCalculateTotalPrice}
                                        >
                                        </InputForm>
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <button
                                        type="submit"
                                        onClick={() => handleSubmit}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 mt-0 md:mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Crear insumo
                                    </button>
                                </div>

                            </>

                        </Transition>
                    </div>

                    {/*<div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can
                            receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="first-name"
                                        name="first-name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="last-name"
                                        name="last-name"
                                        type="text"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="street-address"
                                        name="street-address"
                                        type="text"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="region"
                                        name="region"
                                        type="text"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="postal-code"
                                        name="postal-code"
                                        type="text"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>*/}

                    {/*<div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            We'll always let you know about important changes, but you pick what else you want to hear
                            about.
                        </p>

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                                <div className="mt-6 space-y-6">
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                Comments
                                            </label>
                                            <p className="text-gray-500">Get notified when someones posts a comment on a
                                                posting.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="candidates" className="font-medium text-gray-900">
                                                Candidates
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate applies for a
                                                job.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="offers"
                                                name="offers"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor="offers" className="font-medium text-gray-900">
                                                Offers
                                            </label>
                                            <p className="text-gray-500">Get notified when a candidate accepts or
                                                rejects an offer.</p>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications
                                </legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your
                                    mobile phone.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-everything"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-everything"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Everything
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-email"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Same as email
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="push-nothing"
                                            name="push-notifications"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="push-nothing"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            No push notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>*/}
                </div>

                {/*<div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>*/}
            </form>
        </div>



    );
}