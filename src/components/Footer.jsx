import React from 'react';
import { GitHubIcon } from './Icons.jsx';

export default function Footer() {
  const navigation = [
    {
      name: 'GitHub',
      href: 'https://github.com/laurianek/ohmie-dashboard',
      icon: GitHubIcon,
    },
  ];

  return (
    <footer className="border-t-[1px] border-t-lisbon-500 md:pl-64">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-start md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-lisbon-400 hover:text-lisbon-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0 text-lisbon-400 text-base text-center md:text-left">
          <p className="text-base truncate">
            Made with ❤️ in Europe. From Ohmie to Ohmie
          </p>
          <p className="truncate mt-3">
            ☕️ Buy me a coffee <br />{' '}
            0x2842CbA0E1C403FaaaBB2C6abEa699CaE9208AC6
          </p>
        </div>
      </div>
    </footer>
  );
}
