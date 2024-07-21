import ProductOption from "./ProductOption.jsx";

export default function ProductOptionsSection({title1,title2,title3,listTitle,iterationOptions,onClickFunction,optionSelected,arraySelection}) {
    return (
        <div className="mt-10 py-10 border-b border-gray-200">
            <div className="mx-auto max-w-2xl lg:text-center">
                {title1 && (<h2 className="text-base font-semibold leading-7 text-indigo-600">{title1}</h2>)}
                {title2 && (<p className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title2}</p>)}
                {listTitle && (
                    <ul className="text-center">
                        {listTitle.map(item =>
                            <li key={item.id}
                                className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-xl">☻{item.name}</li>
                        )}
                    </ul>
                )}
                {title3 && (<p className="mt-6 text-lg leading-8 text-gray-600">{title3}</p>)}
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-16 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-y-8 lg:gap-y-0 lg:max-w-none lg:grid-cols-2">
                    {Object.values(iterationOptions).length > 0 && (
                        iterationOptions.map((option) => (
                        <ProductOption
                            key={option.id}
                            option={option}
                            onClick={() => onClickFunction(option)}
                            selectedOption={optionSelected ? optionSelected : null}
                            arraySelection={arraySelection ? arraySelection : null}
                        ></ProductOption>
                    )
                        ))}
                </dl>
            </div>
        </div>
    );
}