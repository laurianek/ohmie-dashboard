import { XMarkIcon } from '@heroicons/react/24/outline/index.js';

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
