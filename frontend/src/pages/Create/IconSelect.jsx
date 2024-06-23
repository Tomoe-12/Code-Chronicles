import  { useState, useEffect, forwardRef } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import icons from '../../../public/icon.json';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const IconSelect = forwardRef(({ value, onChange }) => {
    const [selected, setSelected] = useState(value );
    
    value = icons[4]
    console.log(value);

    useEffect(() => {
        setSelected(value);
    }, [value]);

    const handleChange = (icon) => {
        setSelected(icon);
        onChange(icon);
    };

    return (
        <Listbox value={selected} onChange={handleChange}>
            {({ open }) => (
                <>
                    <div className="w-24 h-24 mx-auto outline outline-teal-600 flex items-center justify-center rounded-2xl">
                        {selected && <img className='h-20' src={selected.icon} alt={selected.name} />}
                    </div>
                    <div className="relative mt-5">
                        <ListboxButton className="relative w-full cursor-default rounded-md bg-gray-900 py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                                {selected ? (
                                    <>
                                        <img src={selected.icon} alt={selected.name} className="h-5 w-5 flex-shrink-0 rounded-full" />
                                        <span className="ml-3 block text-teal-600 text-base truncate">{selected.name}</span>
                                    </>
                                ) : (
                                    <span className="ml-3 block text-teal-600 text-base truncate">Select an icon</span>
                                )}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </ListboxButton>

                        <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {icons.map((icon) => (
                                <ListboxOption
                                    key={icon.id}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'bg-teal-600 text-white' : '',
                                            !active ? 'text-teal-600' : '',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={icon}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                <div className="w-7 h-7 flex items-center justify-center rounded-2xl">
                                                    <img className='h-4 w-4' src={icon.icon} alt={icon.name} />
                                                </div>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                    {icon.name}
                                                </span>
                                            </div>

                                            {selected ? (
                                                <span
                                                    className={classNames(
                                                        active ? 'text-white' : 'text-teal-600',
                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                    )}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </div>
                </>
            )}
        </Listbox>
    );
});

// Set display name for the component
IconSelect.displayName = 'IconSelect';

export default IconSelect;
