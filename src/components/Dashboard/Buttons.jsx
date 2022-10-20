import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline/index.js';

export function NavCloseButton({ onClick }) {
  return (
    <button
      type="button"
      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      onClick={onClick}
    >
      <span className="sr-only">Close sidebar</span>
      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
    </button>
  );
}

export function MenuButton({ onClick }) {
  return (
    <button
      type="button"
      className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-lisbon-50 hover:text-lisbon-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-paris-400"
      onClick={onClick}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
