export default function SelectForm({selectId, dataList, reference, defaultValue, labelValue, validationErrors, mediaQuery, onChangeFunction, textColor}) {

    return (
        <div>
            <label
                className={`block text-sm ${validationErrors ? 'text-red-600' : ''} font-medium leading-6 text-gray-900`}
                htmlFor={selectId ? selectId : null}>
                {labelValue}
            </label>
            <select id={selectId ? selectId : null}
                    className={`block w-full ${mediaQuery ? `md:${mediaQuery}` : null} text-sm ${textColor} ${validationErrors ? 'border-red-600 shadow-red-600' : ''} rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                   focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                    ref={reference} defaultValue={defaultValue ? defaultValue : null}
                    onChange={onChangeFunction ? () => onChangeFunction(document.getElementById(selectId).value) : null}>
                <option value="">-- Seleccione --</option>
                {dataList.map(item =>
                    <option key={item.id}
                            value={item.id}>{item.name}
                    </option>
                )}
            </select>

            {validationErrors && (<p className='text-sm text-red-900 mt-1'>{validationErrors}</p>)}

        </div>
    )
}