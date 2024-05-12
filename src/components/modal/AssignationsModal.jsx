import useApp from "../../hooks/useApp.js";
import AssignationRow from "../services/AssignationRow.jsx";
import {useOperators} from "../../hooks/useOperators.js";
import InputForm from "../layout/InputForm.jsx";
import ModalLayout from "./ModalLayout.jsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import Sidebar from "../layout/Sidebar.jsx";
import {useRef, useState} from "react";

export default function AssignationsModal({closeFunction, title}) {

    const nodeRef = useRef(null)

    const {newAssignationSelected, assignationServiceSelected:assignations} = useApp()
    const {operators:allOperators} = useOperators()
    const [divId, setDivId] = useState('')

    const operators = allOperators.filter(operator => operator.disponible)

    newAssignationSelected.forEach( assignation => {

        const index = operators.indexOf(operator => operator.operator_id === assignation.operator_id)
        operators.splice(index,0)

        }
    )


    return (

        <ModalLayout title={title ? title : null}
                     closeFunction={closeFunction ? closeFunction : null}
                     children={

                         <div>


                             {(operators.length > 0 && assignations.length < 3) && (<p className='flex flex-row items-center gap-1 text-sm text-white p-5 mb-3'>Presione
                                 el <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-plus-circle-fill text-blue-500"
                                         viewBox="0 0 16 16">
                                     <path
                                         d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                 </svg> para asignar el técnico</p>)}

                             {
                                 (operators.length > 0 && assignations.length < 3) && (
                                     operators.map(operator => (

                                         <SwitchTransition mode={'out-in'}>
                                             <CSSTransition
                                                 key={operator.operator_id}
                                                 nodeRef={nodeRef}
                                                 addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
                                                 classNames='fade'
                                             >
                                                 <div ref={nodeRef}>
                                                     <AssignationRow key={operator.operator_id} operator={operator} isAssignation={true}></AssignationRow>
                                                 </div>

                                             </CSSTransition>
                                         </SwitchTransition>

                                     )))
                             }

                             {
                                 (operators.length > 0 && assignations.length === 3) && (
                                     <p className='text-white'>Ya se asignó la cantidad máxima de tecnicos !</p>
                                 )
                             }

                             {
                                 (operators.length === 0 && assignations.length < 3) && (
                                     <p className='text-white'>No hay técnicos disponibles !</p>
                                 )
                             }
                         </div>
                     }
        >

        </ModalLayout>
    )
}