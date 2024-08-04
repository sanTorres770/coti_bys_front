import {createRef, useEffect, useState} from "react";
import useApp from "../../hooks/useApp.js";
import {Transition} from "@headlessui/react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import SupplyForm from "../../components/supplies/SupplyForm.jsx";

export default function UpdateSupplyForm() {

    const {validationErrors,
        setValidationErrors,
        updateSupply,
        getAllSupplies,
        allSupplies,
        selectedSidebarOption,
        setSelectedSidebarSubOption} = useApp();

    const [supplyData, setSupplyData] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)
    const [makerOptionEdit, setMakerOptionEdit] = useState({})
    const [errores, setErrores] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const descriptionRef = createRef()
    const referenceRef = createRef()
    const sourceRef = createRef()

    const handleSubmit = e => {

        e.preventDefault()

        setValidationErrors({})
        setIsLoading(true)

        const editSupply = {
            id: supplyData !== undefined ? supplyData.id : null,
            description: descriptionRef.current.value,
            reference: referenceRef.current.value,
            source: sourceRef.current.value,
            totalPrice: totalPrice,
            supplyAmount: 1,
            maker: makerOptionEdit,
            active: true
        }


        updateSupply(editSupply,supplyData !== undefined ? supplyData.id : null).then(data => {

            if (data.status === 200 || data.status === 201) {
                toast.success(`El insumo ${data.data.description} se actualizó correctamente!`)

                const buttonToClose = document.getElementById(`sidebar_option_${selectedSidebarOption.id}`);

                if (buttonToClose !== null){
                    buttonToClose.click()
                }

                setSelectedSidebarSubOption({})
                navigate('/dashboard')
            }else {
                toast.error('Error en el proceso.')
            }

        }).catch(error => {


            if (error.code === "ERR_BAD_REQUEST"){
                setErrores(Object.values(error.response.data))
                setValidationErrors(error.response.data)
                toast.error('Revisa los campos que faltan por diligenciar en el formulario.')
            }

            if (error.code === "ERR_NETWORK"){
                toast.error('Error de conexión.')
            }


        }).finally(() => setIsLoading(false))

    }

    useEffect(() => {
        getAllSupplies()
    }, []);

    useEffect(() => {
        setTotalPrice(supplyData !== null ? supplyData.totalPrice !== undefined ? supplyData.totalPrice : 0 : 0)
        setMakerOptionEdit(supplyData !== null ? supplyData.maker : null)
    }, [supplyData]);


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

                <SupplyForm supplyData={supplyData || {}}
                            setSupplyData={setSupplyData}
                            validationErrors={validationErrors}
                            errors={errores}
                            allSupplies={allSupplies}
                            handleSubmit={handleSubmit}
                            descriptionRef={descriptionRef}
                            referenceRef={referenceRef}
                            sourceRef={sourceRef}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                            makerOption={makerOptionEdit}
                            setMakerOption={setMakerOptionEdit}
                            buttonValue={'Actualizar insumo'}
                            isEdit={true}
                            isLoading={isLoading}
                >
                </SupplyForm>

            </Transition>
</div>

    );
}