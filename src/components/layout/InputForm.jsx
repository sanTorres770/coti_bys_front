export default function InputForm({inputId, reference, defaultValue, labelValue, validationErrors, mediaQuery, bgLabelColor, textColor, type, onChangeFunction, fontSize, textUppercase}) {
    return (
        <div className="relative z-0 w-full mb-6 group">
            <input id={inputId ? inputId : null}
                   type={type}
                   className={`block px-2.5 pb-2.5 pt-4 w-full ${mediaQuery ? `md:${mediaQuery}` : null} ${fontSize ? fontSize : null} ${textColor} bg-transparent rounded-lg border-2 appearance-none shadow-md ${validationErrors ? 'border-red-600 shadow-red-600' : 'border-gray-600 shadow-gray-500'} focus:outline-none focus:ring-0 focus:border-blue-900 peer`}
                   placeholder=" "
                   onChange={onChangeFunction ? () => onChangeFunction() : null}
                   ref={reference ? reference : null} defaultValue={defaultValue ? defaultValue : null}
                   style={textUppercase ? {textTransform: 'uppercase'} : null}/>
            <label className={`absolute text-sm ${validationErrors ? 'text-red-600' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] ${bgLabelColor} px-2 peer-focus:px-2 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
                   htmlFor={inputId ? inputId : null}>
                {labelValue}
            </label>

            {validationErrors && (<p className='text-sm text-red-900 mt-1'>{validationErrors}</p>)}

        </div>
    )
}