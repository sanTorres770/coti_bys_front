import {createRef, useEffect, useRef, useState} from "react";
import useApp from "../../hooks/useApp.js";
import customAxios from "../../config/axios.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.js";
import ValidationFormAlert from "../alerts/ValidationFormAlert.jsx";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import AssignationRow from "../services/AssignationRow.jsx";
import ModalLayout from "./ModalLayout.jsx";
import TextAreaForm from "../layout/TextAreaForm.jsx";

export default function FinishServiceModal({closeFunction, title}) {

    const {user} = useAuth({middleware:'auth'})
    const [finishServiceAnswer, setFinishServiceAnswer] = useState('');
    const {serviceSelected,
        setFinishServiceModal} = useApp()

    const {service_request_id} = serviceSelected

    const navigate = useNavigate()
    const [errores, setErrores] = useState([])

    const imageRef = useRef()

    const uploadFiles = () => {
        imageRef.current.click()
    }

    const [images, setImages] = useState([])
    const [preview, setPreview] = useState([])


    useEffect(() => {
        if (images.length > 0){

            const previewsArray = []

            images.map(image => {
                const reader = new FileReader()
                reader.onloadend = () => {
                    previewsArray.push(reader.result.toString())
                    setPreview([...previewsArray])
                }
                reader.readAsDataURL(image)
            })
        }else {
            setPreview([...''])
        }
    },[images])


    const handleSaveFinishService = async e => {

        e.preventDefault();

        const form = document.getElementById("finishForm");

        const formData = new FormData(form);
        formData.append('service_request_id',service_request_id)
        formData.append('finisher_user',user ? user.id : null)

        try {
            const {data} = await customAxios.post('/api/finish/service',formData)

            if (data.response){
                setErrores([])
                setFinishServiceModal(false)
                toast.success(data.message)
                navigate(user.role === 'admin' ? '/admin/services' : '/operator/services')
            }else {
                console.log(data)
                toast.error(data.message)
            }

        }catch (error){
            console.log(error)
            setErrores(Object.values(error.response.data.errors))
        }

        if (errores){

            window.scroll({
                top: 100,
                behavior: 'smooth'
            })
        }

    }


    const observationField = <TextAreaForm textAreaName={'observation'}
                                           textColor={'text-white'}
                                           bgLabelColor={'bg-gray-900'}
                                           textAreaRows={5}
                                           labelValue={'Observaciones'}>
    </TextAreaForm>

    return (

        <ModalLayout title={title ? title : null}
                     closeFunction={closeFunction ? closeFunction : null}
                     height={'h-auto'}
                     children={

                         <form onSubmit={handleSaveFinishService} id='finishForm' encType="multipart/form-data" noValidate className='p-3'>

                             {errores ? errores.map(error => <ValidationFormAlert key={error}>{error}</ValidationFormAlert>) : null}

                             <div className='flex justify-center items-center gap-2 my-2'>
                                 <p className='text-white font-bold'>¿el servicio se finalizó  correctamente?</p>
                                 <label className='text-gray-500 font-bold' htmlFor="finishServiceAnswerYes">Si</label>
                                 <input onChange={(e)=>setFinishServiceAnswer(e.target.value)} value='Y' name='finishServiceAnswer' id='finishServiceAnswerYes' type="radio"/>
                                 <label className='text-gray-500 font-bold' htmlFor="finishServiceAnswerNo">No</label>
                                 <input onChange={(e)=>setFinishServiceAnswer(e.target.value)} value='N'  name='finishServiceAnswer' id='finishServiceAnswerNo' type="radio"/>
                             </div>

                             {finishServiceAnswer === 'Y' && (
                                 <div className='flex justify-center flex-col gap-3 my-10'>

                                     <input onChange={(e)=> {
                                         const fileList = [...e.target.files]
                                         setImages([...fileList])
                                     }}

                                            type="file" multiple={true} accept='image/*, .pdf' style={{display:'none'}} name='images[]' ref={imageRef}/>


                                     {observationField}

                                     {images.length > 0 &&

                                         (<div className='flex md:justify-center flex-col gap-2 md:flex-row'>
                                             {preview.map((image, index) => (
                                                 <embed key={index} src={image} alt="image" onClick={uploadFiles}
                                                        className='md:max-h-20 md:max-w-xs border-2 max-h-20 max-w-xs hover:bg-gray-500'/>
                                             ))}
                                         </div>)

                                     }

                                     <div className='flex justify-center col-span-full flex-col mt-10'>
                                         <div className='flex justify-center flex-row'>
                                             <img src="../../img/upload.png" alt="error" width={64} height={64} onClick={uploadFiles} className='hover:cursor-pointer hover:animate-bounce'/>
                                         </div>
                                         <div className='text-center'>
                                             <p className='text-lg font-medium text-white'>
                                                 {images.length > 0 ?
                                                     'Actualizar evidencias'
                                                     :
                                                     'Adjuntar evidencias'
                                                 }</p>
                                         </div>
                                     </div>


                                 </div>
                             )}

                             {finishServiceAnswer === 'N' && (
                                 <div>
                                     {observationField}
                                 </div>
                             )}

                             {finishServiceAnswer ?
                                 <div className='flex justify-center'>
                                     <button type='submit'
                                             className="flex gap-4 bg-blue-500 hover:bg-blue-300 text-white w-auto mb-4 p-3 rounded-md uppercase font-bold cursor-pointer">
                                         <img src="../../img/check.png" alt="error"/>
                                         <p className='text-black font-bold text-lg uppercase'>Finalizar servicio</p>
                                     </button>
                                 </div>:

                                 ''
                             }

                         </form>

                     }
        >

        </ModalLayout>
    )
}