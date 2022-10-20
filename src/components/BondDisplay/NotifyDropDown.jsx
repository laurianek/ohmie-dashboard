import React from 'react';
import { Combobox } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid/index.js';
import notificationOptions from './NotificationOptions.js';
import { classNames } from '../../util/index.js';

export default function NotifyDropDown({ value, onChange }) {
  return (
    <Combobox as="div" value={value} className="w-3/4" onChange={onChange}>
      <div className="relative mt-1">
        <div
          tabIndex={-1}
          className="w-full rounded-md border border-lisbon-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-paris-500 focus:outline-none focus:ring-1 focus:ring-paris-500 sm:text-sm"
        >
          {value}
        </div>
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-lisbon-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {notificationOptions.map(({ type, text }) => (
            <Combobox.Option
              key={type}
              value={text}
              className={({ active }) =>
                classNames(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-paris-600 text-white' : 'text-lisbon-900'
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={classNames(
                      'block truncate',
                      selected && 'font-semibold'
                    )}
                  >
                    {text}
                  </span>

                  {selected && (
                    <span
                      className={classNames(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-paris-600'
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
