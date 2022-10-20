import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChartBarIcon, HomeIcon } from '@heroicons/react/24/outline';
import UserProfile from './UserProfile.jsx';
import Main from './MainContent.jsx';
import Logo from './Logo.jsx';
import { NavCloseButton } from './Buttons.jsx';
import NavItem from './NavItem.jsx';

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
  {
    name: 'More Feature (coming soon)',
    href: '#',
    icon: ChartBarIcon,
    current: false,
  },
  // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
  // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

export default function Dashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const openSidebar = () => setSidebarOpen(true);

  return (
    <>
      <div className="">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-lisbon-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <NavCloseButton onClick={closeSidebar} />
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <Logo isMobile />
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item) => (
                        <NavItem key={item.name} item={item} isMobile />
                      ))}
                    </nav>
                  </div>
                  <UserProfile isMobile />
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-lisbon-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <Logo />
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>
            <UserProfile />
          </div>
        </div>
        <Main openSidebar={openSidebar}>{children}</Main>
      </div>
    </>
  );
}
