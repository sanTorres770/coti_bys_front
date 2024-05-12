import useApp from "../../hooks/useApp.js";

export default function SelectForm({selectId, dataList, reference, defaultValue, labelValue, validationErrors, mediaQuery, onChangeFunction, bgLabelColor, textColor}) {

    return (
        <div className="relative z-0 w-full mb-6 group">
            <select id={selectId ? selectId : null} className={`block px-2.5 pb-2.5 pt-4 w-full ${mediaQuery ? `md:${mediaQuery}` : null} text-sm ${textColor} bg-transparent rounded-lg border-2 appearance-none shadow-md ${validationErrors ? 'border-red-600 shadow-red-600' : 'border-gray-600 shadow-gray-500'} focus:outline-none focus:ring-0 focus:border-blue-700 peer shadow-md shadow-gray-500`}
                    ref={reference} defaultValue={defaultValue ? defaultValue : null} onChange={onChangeFunction ? () => onChangeFunction(document.getElementById(selectId).value) : null}>
                <option value="">-- Seleccione --</option>
                {dataList.map(item =>
                    <option key={item.id ? item.id : item.instrument} value={item.id ? item.id : item.nit}>{item.name ? item.name : item.business_name}</option>
                )}
            </select>

            <label className={`absolute text-sm ${validationErrors ? 'text-red-600' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] ${bgLabelColor} px-2 peer-focus:px-2 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
                {labelValue}
            </label>

            {validationErrors && (<p className='text-sm text-red-900 mt-1'>{validationErrors}</p>)}

        </div>
    )
}