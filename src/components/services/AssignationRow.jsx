import useApp from "../../hooks/useApp.js";

export default function AssignationRow({operator, isAssignation}) {

    const {id, name} = operator
    const {handleAddOperator, serviceSelected} = useApp()


    return (

        <>

            <div className='bg-gray-900 flex items-center gap-4 border-b-4 border-sky-950 w-full p-3 hover:bg-gray-800 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                     className="bi bi-person-circle text-gray-500" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                <p className='text-gray-500'>{name}</p>

                {isAssignation && (
                    <button type='button' onClick={()=>handleAddOperator(operator, serviceSelected.service_request_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                             className="bi bi-plus-circle-fill text-blue-500 hover:animate-bounce" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </button>
                )}

            </div>
        </>
    )
}