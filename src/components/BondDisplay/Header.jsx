import React from 'react';

export default function Header({ title, subTitle }) {
  return (
    <div className="mt-12">
      <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
        <h3 className="ml-2 mt-2 text-xl font-medium leading-6">{title}</h3>
        <p className="ml-2 mt-1 truncate text-sm text-paris-200">{subTitle}</p>
      </div>
    </div>
  );
}
