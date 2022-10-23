import { Fragment, useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { APP_VERSION } from '../../constants/index.js';
import { useStore } from '../../store.jsx';

const a_moment_later = 1000 * 4;

export default function Example() {
  const [show, setShow] = useState(false);
  const { data } = useStore();
  const refreshPage = () => document.location.reload();

  useEffect(() => {
    function check_app_version() {
      if (APP_VERSION < data?.app_version) setShow(true);
    }
    setTimeout(check_app_version, a_moment_later);
  }, []);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-10 opacity-0 sm:translate-y-0 sm:translate-x-20"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-lisbon-900">
                      There is a new version of the this site available
                    </p>
                    <button
                      type="button"
                      onClick={refreshPage}
                      className="ml-3 flex-shrink-0 rounded-md bg-white text-sm font-medium text-paris-600 hover:text-paris-500 focus:outline-none focus:ring-2 focus:ring-paris-500 focus:ring-offset-2"
                    >
                      Refresh page
                    </button>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-lisbon-400 hover:text-lisbon-500 focus:outline-none focus:ring-2 focus:ring-paris-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
