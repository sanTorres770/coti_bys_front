import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon} from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useState } from 'react'

export default function ComboboxSelect({data,queryAttribute,displayAttribute,displayCompoundAttribute,displaySimpleAttribute,selected,setSelected,placeholder}) {

    const [query, setQuery] = useState('')

    const filteredData =
        query === ''
            ? data
            : data.filter((item) => {
                return item[queryAttribute].toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div>
            <Combobox multiple virtual={{options: filteredData}} value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg bg-gray-500/10 m-5 py-4 pr-8 pl-3 text-sm/6 text-gray-600 shadow-md border border-gray-200',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        displayValue={(item) => item[displayAttribute]}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={placeholder}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDownIcon className='text-gray-700' height='24' width='24'/>
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition='true'
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-gray-500/10 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {({option: item}) => (
                        <ComboboxOption
                            key={item.id}
                            value={item}
                            className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100"
                        >
                            <CheckIcon className="invisible w-4 h-4 fill-gray-500 group-data-[selected]:visible" />
                            <div className="text-sm/6 text-gray-600">{item[displayAttribute]}
                                {displaySimpleAttribute && (<span>{` - ${item[displaySimpleAttribute]}`}</span>)}
                                {displayCompoundAttribute && (<span>{` - ${item[displayCompoundAttribute[0]][displayCompoundAttribute[1]]}`}</span>)}
                            </div>
                        </ComboboxOption>
                    )}
                </ComboboxOptions>
            </Combobox>
        </div>
    )
}
