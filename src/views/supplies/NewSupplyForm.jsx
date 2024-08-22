import {Transition} from "@headlessui/react";
import useApp from "../../hooks/useApp.js";
import {createRef, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import SupplyForm from "../../components/supplies/SupplyForm.jsx";


export default function NewSupplyForm() {

    const {validationErrors,
        setValidationErrors,
        saveNewSupply,
        selectedSidebarOption,
        setSelectedSidebarSubOption} = useApp();

    const navigate = useNavigate()

    const descriptionRef = createRef()
    const referenceRef = createRef()
    const sourceRef = createRef()

    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedMakerServiceOption, setSelectedMakerServiceOption] = useState(null)
    const [errores, setErrores] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = e => {

        e.preventDefault()

        setValidationErrors({})
        setIsLoading(true)

        const newSupply = {
            description: descriptionRef.current.value,
            reference: referenceRef.current.value,
            source: sourceRef.current.value,
            totalPrice: totalPrice,
            supplyAmount: 1,
            maker: selectedMakerServiceOption,
            active: true
        }

        saveNewSupply(newSupply).then(data => {

            if (data.status === 200 || data.status === 201) {
                toast.success(`El insumo ${data.data.description} se creó correctamente!`)

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

                switch (error.response.status) {

                    case 400: {
                        setErrores(Object.values(error.response.data))
                        setValidationErrors(error.response.data)
                        toast.error('Revisa los campos que faltan por diligenciar en el formulario.')
                        break;
                    }

                    case 403: {
                        toast.error('No autorizado.')
                        break;
                    }

                }

            }

            if (error.code === "ERR_NETWORK"){
                toast.error('Error de conexión.')
            }


        }).finally(() => setIsLoading(false))

    }

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

                    <SupplyForm validationErrors={validationErrors}
                                errors={errores}
                                handleSubmit={handleSubmit}
                                descriptionRef={descriptionRef}
                                referenceRef={referenceRef}
                                sourceRef={sourceRef}
                                totalPrice={totalPrice}
                                setTotalPrice={setTotalPrice}
                                makerOption={selectedMakerServiceOption}
                                setMakerOption={setSelectedMakerServiceOption}
                                buttonValue={'Crear insumo'}
                                isEdit={false}
                                isLoading={isLoading}
                    >
                    </SupplyForm>

                </Transition>
            </div>

    );
}