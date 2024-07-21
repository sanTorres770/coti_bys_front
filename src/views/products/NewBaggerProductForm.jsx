import InputForm from "../../components/layout/InputForm.jsx";
import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {createRef, useEffect, useState} from "react";
import SelectListBox from "../../components/layout/SelectListBox.jsx";
import Table from "../../components/table/Table.jsx";
import DashboardTable from "../../components/table/DashboardTable.jsx";
import AssignSupplyTable from "../../components/table/AssignSupplyTable.jsx";
import ComboboxSelect from "../../components/combobox/ComboboxSelect.jsx";
import {commonConfig} from "../../hooks/commonConfig.js";

export default function NewBaggerProductForm() {

    const {validationErrors,
        serviceOptionsByType,
        saveNewBaggerProduct,
        allSupplies,
        getServiceOptionsByType,
        getAllSupplies,
        selectedVelocityServiceOption,
        setSelectedVelocityServiceOption,
        selectedPackingMaterialServiceOption,
        setSelectedPackingMaterialServiceOption} = useApp();

    const {formatPriceToCurrency} = commonConfig()

    const productNameRef = createRef()
    const inoxPriceRef = createRef()
    const acPriceRef = createRef()

    const [inoxPrice, setInoxPrice] = useState(0)
    const [acPrice, setAcPrice] = useState(0)
    const [velocityOptions, setVelocityOptions] = useState([])
    const [packingMaterialOptions, setPackingMaterialOptions] = useState([])
    const [assignedSupplies, setAssignedSupplies] = useState([])
    const [supplyAmounts, setSupplyAmounts] = useState([])

    const handleFocusOutUnitInoxInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(inoxPrice))

    }

    const handleFocusInInoxPriceInput = (e) => {
        e.target.value = inoxPrice

    }

    const handleChangeInoxPriceInput = (e) => {
        setInoxPrice(Number(e.target.value))
    }

    const handleFocusOutAcPriceInput = (e) => {

        e.target.value = formatPriceToCurrency(Number(acPrice))
    }

    const handleFocusInAcPriceInput = (e) => {
        e.target.value = acPrice

    }

    const handleChangeAcPriceInput = (e) => {
        setAcPrice(Number(e.target.value))
    }

    const handleSubmit = e => {

        e.preventDefault()

        setSupplyAmounts([])

        assignedSupplies.map((supply,index) => {


            let supplyAmount = {
                supply: {
                    id: supply.id,
                },
                amount: document.getElementById(`amount_${index}`).value,
            }

            supplyAmounts.push(supplyAmount)
        })


        const newBaggerProduct = {
            name: productNameRef.current.value,
            velocity: selectedVelocityServiceOption,
            packingMaterial: selectedPackingMaterialServiceOption,
            supplies: assignedSupplies,
            stainlessSteelPrice: inoxPrice,
            carbonSteelPrice: acPrice,
            supplyAmounts: supplyAmounts,
            active: true
        }

        saveNewBaggerProduct(newBaggerProduct)

    }

    useEffect(() => {
        getServiceOptionsByType("BRUTA,DUPLEX,NETA,BANDA,TORNILLO,GRAVEDAD")
        getAllSupplies()
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
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Creación de productos de
                                ensacadora</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Ingrese la información de los productos de ensacadora a fabricar.
                            </p>
                            <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-2">
                                    <InputForm
                                        validationErrors={validationErrors ? validationErrors.businessName ? validationErrors.businessName : null : null}
                                        inputId={'productName'}
                                        type={'text'}
                                        labelValue={'Nombre del producto *'}
                                        reference={productNameRef}
                                        placeholder={'Nombre del producto'}
                                    >
                                    </InputForm>
                                </div>

                                <div className="sm:col-span-2">
                                    <SelectListBox
                                        data={serviceOptionsByType.filter(option => ["BRUTA","DUPLEX","NETA"].includes(option.type))}
                                        labelText={'Velocidad *'}
                                        selected={selectedVelocityServiceOption}
                                        setSelected={setSelectedVelocityServiceOption}
                                        displayAttribute={'type'}
                                    >
                                    </SelectListBox>
                                </div>

                                <div className="sm:col-span-2">
                                    <SelectListBox
                                        data={serviceOptionsByType.filter(option => ["BANDA","TORNILLO","GRAVEDAD"].includes(option.type))}
                                        labelText={'Alimentador *'}
                                        selected={selectedPackingMaterialServiceOption}
                                        setSelected={setSelectedPackingMaterialServiceOption}
                                        displayAttribute={'type'}
                                    >
                                    </SelectListBox>
                                </div>

                                <div className="sm:col-span-3">
                                    <InputForm inputId={'unitPrice'}
                                               validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                               type={'text'}
                                               labelValue={'Precio fabricación INOX *'}
                                               placeholder={'Precio fabricación INOX'}
                                               onChangeFunction={handleChangeInoxPriceInput}
                                               onFocusFunction={handleFocusInInoxPriceInput}
                                               onBlurFunction={handleFocusOutUnitInoxInput}
                                    >
                                    </InputForm>
                                </div>

                                <div className="sm:col-span-3">
                                    <InputForm inputId={'freight'}
                                               validationErrors={validationErrors ? validationErrors.telephone ? validationErrors.telephone : null : null}
                                               type={'text'}
                                               labelValue={'Precio fabricación AC *'}
                                               placeholder={'Precio fabricación AC'}
                                               onChangeFunction={handleChangeAcPriceInput}
                                               onFocusFunction={handleFocusInAcPriceInput}
                                               onBlurFunction={handleFocusOutAcPriceInput}
                                    >
                                    </InputForm>
                                </div>

                            </div>
                        </div>
                        <div className="border-b border-gray-900/10">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Asignación de insumos
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                Busque el insumo que requiere y presione sobre él para asignarlo al producto.
                            </p>
                            <div className="py-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                <div className="sm:col-span-3">
                                    <ComboboxSelect data={allSupplies}
                                                    queryAttribute={'description'}
                                                    displayAttribute={'description'}
                                                    displaySimpleAttribute={'reference'}
                                                    displayCompoundAttribute={['maker','name']}
                                                    selected={assignedSupplies}
                                                    setSelected={setAssignedSupplies}
                                                    placeholder={'Búsqueda de insumos'}>
                                    </ComboboxSelect>
                                </div>

                                <div className="sm:col-span-3">
                                    <AssignSupplyTable data={assignedSupplies}
                                                        columnNames={[
                                                        {
                                                            id: '1',
                                                            name: 'Descripción'
                                                        },
                                                        {
                                                            id: '2',
                                                            name: 'Referencia'
                                                        },
                                                        {
                                                            id: '3',
                                                            name: 'Fabricante'
                                                        },
                                                        {
                                                            id: '4',
                                                            name: 'Cantidad'
                                                        },
                                                    ]}
                                    ></AssignSupplyTable>
                                </div>

                            </div>

                            <div className="sm:col-span-1 mb-5">
                                <button
                                    type="submit"
                                    onClick={() => handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 mt-0 md:mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                Crear producto
                                </button>
                            </div>

                        </div>
                    </div>
                </form>
            </Transition>
        </div>


    );
}