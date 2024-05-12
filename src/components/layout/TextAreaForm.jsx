export default function TextAreaForm({textAreaName, reference, defaultValue, labelValue, validationErrors, mediaQuery, bgLabelColor, textAreaRows, textColor, textUppercase}) {
    return (

            <div className="relative z-0 w-full mb-6 group">
                                <textarea className={`block px-2.5 pb-2.5 pt-4 w-full ${mediaQuery ? `md:${mediaQuery}` : null} text-sm ${textColor ? textColor : null} bg-transparent rounded-lg border-2 appearance-none shadow-md ${validationErrors ? 'border-red-600 shadow-red-600' : 'border-gray-600 shadow-gray-500'} border-gray-600 shadow-gray-500 focus:outline-none focus:ring-0 focus:border-blue-900 peer`}
                                          placeholder=" "
                                          name={textAreaName}
                                          ref={reference ? reference : null}
                                          rows={textAreaRows ? textAreaRows : null}
                                          defaultValue={defaultValue ? defaultValue : null}
                                          style={textUppercase ? {textTransform: 'uppercase'} : null}></textarea>
                <label className={`absolute text-sm ${validationErrors ? 'text-red-600' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] ${bgLabelColor ? bgLabelColor : 'bg-gray-300'} px-2 peer-focus:px-2 peer-focus:text-blue-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}>
                    {labelValue}
                </label>

            </div>
    )
}