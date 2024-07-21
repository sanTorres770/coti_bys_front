export default function InputForm({inputId, reference, defaultValue, labelValue, validationErrors, type, onChangeFunction, textUppercase, additionalLabelLink, placeholder, readonly, onFocusFunction, preSpan, onBlurFunction}) {
    return (
        <div>
            <div className="flex items-center justify-between">
                <label
                    className={`block text-sm ${validationErrors ? 'text-red-600' : ''} font-medium leading-6 text-gray-900`}
                    htmlFor={inputId ? inputId : null}>
                    {labelValue}
                </label>
                {additionalLabelLink && (
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Crear una cuenta
                        </a>
                    </div>
                )}
            </div>
            <div className={`flex w-full rounded-md ${validationErrors ? 'border-red-600 shadow-red-600' : ''} shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600`}>
                {preSpan && (<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{preSpan}</span>)}
                <input id={inputId ? inputId : null}
                       type={type}
                       className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                       placeholder={placeholder}
                       onChange={onChangeFunction}
                       ref={reference ? reference : null} defaultValue={defaultValue ? defaultValue : null}
                       style={textUppercase ? {textTransform: 'uppercase'} : null}
                       readOnly={readonly}
                       onFocus={onFocusFunction}
                       onBlur={onBlurFunction}/>
            </div>

            {validationErrors && (<p className='text-sm text-red-900 mt-1'>{validationErrors}</p>)}

        </div>
    )
}