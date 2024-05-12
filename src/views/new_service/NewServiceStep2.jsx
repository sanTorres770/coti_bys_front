import useApp from "../../hooks/useApp.js";
import {useNavigate} from "react-router-dom";
import {createRef, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import SelectForm from "../../components/layout/SelectForm.jsx";
import InputForm from "../../components/layout/InputForm.jsx";
import TextAreaForm from "../../components/layout/TextAreaForm.jsx";
import {useInstruments} from "../../hooks/useInstruments.js";


export default function NewServiceStep2() {

    const {handleSaveForm2, serviceRequest, form2, serviceTypes, unitMeasures, images, setImages, validationErrors} = useApp();

    const {instruments, getAllInstruments} = useInstruments()

    const navigate = useNavigate()

    const serviceTypeRef = createRef()
    const instrumentRef = createRef()
    const locationRef = createRef()
    const capacityRef = createRef()
    const unitMeasureCapacityRef = createRef()
    const scaleDivisionRef = createRef()
    const unitMeasureScaleDivisionRef = createRef()
    const observationRef = createRef()

    const imageRef = useRef()

    const uploadFiles = () => {
        imageRef.current.click()
    }

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

    useEffect(()=>{

        window.scroll({
            top: 200,
            behavior: 'smooth'
        })

        getAllInstruments()

    },[])


    const handleSubmit = e => {

        e.preventDefault()

        const serviceCompany = serviceTypes.filter(type => type.id === serviceTypeRef.current.value)[0].company

        const form = {
            serviceType: serviceTypeRef.current.value,
            serviceCompany: serviceCompany,
            instrument: instrumentRef.current.value,
            location: locationRef.current.value,
            capacity: capacityRef.current.value,
            unitMeasureCapacity: unitMeasureCapacityRef.current.value,
            scaleDivision: scaleDivisionRef.current.value,
            unitMeasureScaleDivision: unitMeasureScaleDivisionRef.current.value,
            observation: observationRef.current.value,
            images: images
        }

        handleSaveForm2({...serviceRequest,...form})
        navigate('/new/step_3')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} noValidate>

                <div className="px-4 sm:px-0">
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">Ingresa la información del equipo que vamos a intervenir</p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="sm:col-span-3">
                        <SelectForm dataList={serviceTypes}
                                    reference={serviceTypeRef}
                                    defaultValue={form2.serviceType}
                                    textColor={'text-black'}
                                    bgLabelColor={'bg-gray-300'}
                                    labelValue={'Tipo de servicio *'}
                                    validationErrors={validationErrors ? validationErrors.serviceType ? validationErrors.serviceType : null : null}>
                        </SelectForm>
                    </div>

                    <div className="sm:col-span-3">
                        <SelectForm dataList={instruments}
                                    reference={instrumentRef}
                                    defaultValue={form2.instrument}
                                    textColor={'text-black'}
                                    bgLabelColor={'bg-gray-300'}
                                    labelValue={'Equipo a intervenir *'}
                                    validationErrors={validationErrors ? validationErrors.instrument ? validationErrors.instrument : null : null}>
                        </SelectForm>
                    </div>

                    <div className="sm:col-span-full">
                        <InputForm inputId={'location'} validationErrors={validationErrors ? validationErrors.location ? validationErrors.location : null : null}
                                   type={'text'}
                                   textUppercase={true}
                                   defaultValue={form2.location}
                                   textColor={'text-black'}
                                   bgLabelColor={'bg-gray-300'}
                                   labelValue={'Ubicación del equipo *'}
                                   reference={locationRef}
                                   mediaQuery={'w-1/2'}
                        >
                        </InputForm>
                    </div>

                    <div className="sm:col-span-3">
                        <InputForm inputId={'capacity'} validationErrors={validationErrors ? validationErrors.capacity ? validationErrors.capacity : null : null}
                                   type={'number'}
                                   defaultValue={form2.capacity}
                                   textColor={'text-black'}
                                   bgLabelColor={'bg-gray-300'}
                                   labelValue={'Capacidad del equipo *'}
                                   reference={capacityRef}>
                        </InputForm>
                    </div>

                    <div className="sm:col-span-3">
                        <SelectForm dataList={unitMeasures}
                                    reference={unitMeasureCapacityRef}
                                    defaultValue={form2.unitMeasureCapacity}
                                    textColor={'text-black'}
                                    bgLabelColor={'bg-gray-300'}
                                    labelValue={'Unidad de medida capacidad *'}
                                    validationErrors={validationErrors ? validationErrors.unitMeasureCapacity ? validationErrors.unitMeasureCapacity : null : null}>
                        </SelectForm>
                    </div>

                    <div className="sm:col-span-3">
                        <InputForm inputId={'scaleDivision'} validationErrors={validationErrors ? validationErrors.scaleDivision ? validationErrors.scaleDivision : null : null}
                                   type={'number'}
                                   defaultValue={form2.scaleDivision}
                                   textColor={'text-black'}
                                   bgLabelColor={'bg-gray-300'}
                                   labelValue={'División de escala'}
                                   reference={scaleDivisionRef}>
                        </InputForm>
                    </div>

                    <div className="sm:col-span-3">
                        <SelectForm dataList={unitMeasures}
                                    reference={unitMeasureScaleDivisionRef}
                                    defaultValue={form2.unitMeasureScaleDivision}
                                    textColor={'text-black'}
                                    bgLabelColor={'bg-gray-300'}
                                    labelValue={'Unidad de medida división de escala'}
                                    validationErrors={validationErrors ? validationErrors.unitMeasureScaleDivision ? validationErrors.unitMeasureScaleDivision : null : null}>
                        </SelectForm>
                    </div>

                    <div className="col-span-full">
                        <TextAreaForm reference={observationRef}
                                      textUppercase={true}
                                      defaultValue={form2.observation}
                                      textColor={'text-black'}
                                      bgLabelColor={'bg-gray-300'}
                                      validationErrors={validationErrors ? validationErrors.observation ? validationErrors.observation : null : null}
                                      labelValue={'Descripción del servicio / observaciones'}>
                        </TextAreaForm>
                    </div>

                    <p className='mt-1'>(*) Obligatorio</p>

                </div>

                <input onChange={(e)=> {
                    const fileList = [...e.target.files]
                    setImages([...fileList])
                }}

                       type="file" multiple={true} accept='image/*, .pdf' style={{display:'none'}} name='images[]' ref={imageRef}/>


                <div className="col-span-full mt-10">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Evidencias
                    </label>

                    {images.length > 0 ?

                        <div className='flex md:flex-wrap md:justify-center flex-col gap-2 md:flex-row bg-gray-500 p-10 rounded border-2 border-gray-600 shadow-lg shadow-gray-500'>
                            {preview.map((image, index) => (
                                <embed key={index} src={image} alt="image" onClick={uploadFiles}
                                       className='md:max-h-40 md:max-w-md border-2 max-h-20 max-w-xs hover:bg-gray-500'/>
                            ))}
                        </div>
                        :
                        <div className='flex md:justify-center flex-col gap-2 md:flex-row bg-gray-500 p-10 rounded border-2 border-gray-600 shadow-lg shadow-gray-500'>
                            <p className='text-lg text-white'>** No se han seleccionado archivos **</p>
                        </div>
                    }
                </div>

                <div className='flex justify-center col-span-full flex-col mt-16'>
                    <div className='flex justify-center flex-row'>
                        <img src="../../img/upload.png" alt="error" onClick={uploadFiles} className='hover:cursor-pointer animate-bounce'/>
                    </div>
                    <div className='text-center'>
                        <p className='text-lg font-medium'>
                            {images.length > 0 ?
                                'Actualizar evidencias'
                                :
                                'Adjuntar evidencias'
                            }</p>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row md:justify-between mt-5'>

                <Link to={'/new/step_1'} className='flex gap-2 bg-blue-600 hover:bg-blue-900 rounded justify-center w-auto text-white mt-5 p-3 uppercase font-bold cursor-pointer'>
                        <img src="../../img/back.png" alt="next"/>
                        <p>Anterior</p>
                    </Link>
                    <button type='submit' className='flex gap-2 bg-blue-600 hover:bg-blue-900 rounded justify-center w-auto text-white mt-5 p-3 uppercase font-bold cursor-pointer'>
                        <p>Finalizar</p>
                        <img src="../../img/next.png" alt="next"/>
                    </button>
                </div>

            </form>
        </div>
    )
}