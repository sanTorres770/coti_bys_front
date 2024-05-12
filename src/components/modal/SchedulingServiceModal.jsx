import useApp from "../../hooks/useApp.js";
import InputForm from "../layout/InputForm.jsx";
import ModalLayout from "./ModalLayout.jsx";
import {useRef} from "react";

export default function SchedulingServiceModal({closeFunction, title}) {

    const {schedulingDate,
        setSchedulingDate,
    } = useApp()

    const saveDate = () => {
        setSchedulingDate(document.getElementById('schedulingDate').value)
    }
    
    return (

        <ModalLayout title={title ? title : null}
                     closeFunction={closeFunction ? closeFunction : null}
                     children={

            <div className='flex justify-center w-full'>
                 <div className='w-1/2'>
                     <InputForm inputId={'schedulingDate'}
                                type={'date'}
                                defaultValue={schedulingDate}
                                labelValue={'Fecha de agendamiento *'}
                                textColor={'text-white'}
                                fontSize={'text-lg'}
                                bgLabelColor={'bg-gray-900'}
                                onChangeFunction={saveDate}>
                     </InputForm>
                 </div>
             </div>
        }
            >

        </ModalLayout>

    )
}