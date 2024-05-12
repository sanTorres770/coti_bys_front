import {steps} from "../../data/steps.js";
import { useLocation} from "react-router-dom";

export default function Steps() {

    const location = useLocation()

    const calculateProgress = () =>{

        let progress = 0

        switch (location.pathname){
            case '/new/step_1': {
                progress = 20
                break
            }
            case '/new/step_2': {
                progress = 60
                break
            }
            case '/new/step_3': {
                progress = 100
                break
            }
        }

        return progress

    }

    return (

        <div className='my-14'>
            <div className='flex justify-between my-5'>
                {steps.map(step => (
                    <div key={step.id} className='flex justify-center items-center gap-2 text-lg font-bold rounded-b w-full text-center'>
                        <img src={`../../${step.icon}`} alt="img" className='text-white'/>
                        <p className='text-lg font-bold md:block hidden'>{step.name}</p>
                        <p className='text-lg font-bold block md:hidden'>{step.nameLite}</p>
                    </div>
                ))}
            </div>

            <div className='bg-gray-100 mb-10 rounded-full'>
                <div className='rounded-full bg-blue-900 h-2 text-xs leading-none text-center text-white'
                style={{width: calculateProgress() + '%'}}></div>
            </div>

        </div>
    )
}