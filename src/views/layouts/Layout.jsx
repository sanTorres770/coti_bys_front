import {Outlet} from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar.jsx";
import {useAuth} from "../../hooks/useAuth.js";
import {ToastContainer} from "react-toastify";
import {SwitchTransition, CSSTransition} from "react-transition-group"
import "react-toastify/dist/ReactToastify.css"
import useApp from "../../hooks/useApp.js";
import Modal from "react-modal"
import AssignationsModal from "../../components/modal/AssignationsModal.jsx";
import SchedulingServiceModal from "../../components/modal/SchedulingServiceModal.jsx";
import FinishServiceModal from "../../components/modal/FinishServiceModal.jsx";
import {useRef} from "react";
import SidebarLite from "../../components/layout/SidebarLite.jsx";

Modal.setAppElement('#root')

export default function Layout() {

    const {user, error} = useAuth({middleware:'auth'})
    const {assignationsModal,
        handleClickAssignationsModal,
        schedulingServiceModal,
        handleClickSchedulingServiceModal,
        finishServiceModal,
        handleClickFinishServiceModal,
        sidebarVisible
    } = useApp()

    const customStyles = {
        content:{
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%,-50%)",
            padding: '10px',
            backgroundColor: 'rgba(58,73,94,0.96)',
        },
    }

    const notVisibleRef = useRef(null);
    const visibleRef = useRef(null);
    const notVisible2Ref = useRef(null);
    const visible2Ref = useRef(null);
    const nodeRef = sidebarVisible ? notVisibleRef : visibleRef;
    const node2Ref = sidebarVisible ? notVisible2Ref : visible2Ref;

    return (

        <>

            <div className='md:flex'>

                <SwitchTransition mode={'out-in'}>
                    <CSSTransition
                        key={sidebarVisible}
                        nodeRef={nodeRef}
                        addEndListener={(done) => nodeRef.current.addEventListener("transitionend", done, false)}
                        classNames='fade'
                    >
                        <div ref={nodeRef}>
                            {sidebarVisible && <Sidebar/>}
                        </div>

                    </CSSTransition>
                </SwitchTransition>


                <div className='md:w-10 bg-gray-900 w-full'>
                    <div className='md:mt-2'>

                        <SwitchTransition mode={'out-in'}>
                            <CSSTransition
                                key={sidebarVisible}
                                nodeRef={node2Ref}
                                addEndListener={(done) => node2Ref.current.addEventListener("transitionend", done, false)}
                                classNames='fade'
                            >
                                <div ref={node2Ref}>
                                    <SidebarLite/>
                                </div>

                            </CSSTransition>
                        </SwitchTransition>


                    </div>
                </div>

                <main className='flex-1'>

                    <div className='md:my-5 md:mx-5 my-1 mx-1 p-5 rounded-xl border-2'>

                        <div className="border-b-4 border-gray-900/10 pb-12">

                            <Outlet/>

                        </div>
                    </div>
                </main>

            </div>



            <Modal isOpen={assignationsModal} style={customStyles} overlayClassName='Overlay'>

                <AssignationsModal closeFunction={handleClickAssignationsModal} title={'Asignación de personal técnico'}></AssignationsModal>

            </Modal>

            <Modal isOpen={schedulingServiceModal} style={customStyles} overlayClassName='Overlay'>

                <SchedulingServiceModal closeFunction={handleClickSchedulingServiceModal} title={'Fecha de prevista para la atención del servicio'}></SchedulingServiceModal>

            </Modal>

            <Modal isOpen={finishServiceModal} style={customStyles} overlayClassName='Overlay'>

                <FinishServiceModal closeFunction={handleClickFinishServiceModal} title={'Finalizar la atención del servicio'}></FinishServiceModal>

            </Modal>

            <ToastContainer/>

        </>
    )
}