import { useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Countdown from '../CountDown.jsx';

export default function Main({ children, openSidebar }) {
  const restartRef = useRef({ id: '0000' });

  return (
    <div className="flex flex-1 flex-col md:pl-64">
      <div className="sticky top-0 z-10 bg-slate-500 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={openSidebar}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hidden md:flex flex-row text-slate-100 justify-between items-center pb-2.5 ">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="inline-flex items-center">
              <span className="inline-block pr-2">refreshing in</span>
              <Countdown initialCount={30} restart={restartRef.current.id} />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 text-slate-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
