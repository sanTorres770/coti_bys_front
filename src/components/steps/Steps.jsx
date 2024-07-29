import {steps as allSteps} from "../../data/steps.js";
import { useLocation} from "react-router-dom";

export default function Steps({option}) {

    const location = useLocation()
    const steps = allSteps.filter(step => step.option === option)

    const calculateProgress = () =>{

        let progress = 0

        switch (location.pathname){
            case '/new/step_1':
            {
                progress = 34
                break
            }
            case '/quot/step_1': {
                progress = 25
                break
            }
            case '/new/step_2':{
                progress = 70
                break
            }
            case '/quot/step_2': {
                progress = 50
                break
            }
            case '/new/step_3': {
                progress = 100
                break
            }
            case '/quot/step_3':{
                progress = 75
                break
            }
            case '/quot/step_4': {
                progress = 100
                break
            }
        }

        return progress

    }

    return (

        <div className='my-5'>
            <div className='flex justify-between my-5'>
                {steps.map(step => (
                    <div key={step.id} className='flex justify-center items-center gap-2 text-lg rounded-b w-full text-center'>
                        <img src={`../../${step.icon}`} alt="img" className='text-white'/>
                        <p className='text-sm font-medium md:block hidden'>{step.name}</p>
                        <p className='text-sm font-medium block md:hidden'>{step.nameLite}</p>
                    </div>
                ))}
            </div>

            <div className='bg-gray-100 mb-10 rounded-full'>
                <div className='rounded-full bg-indigo-600 h-2 text-xs leading-none text-center text-indigo-600'
                style={{width: calculateProgress() + '%'}}></div>
            </div>

        </div>
    )
}