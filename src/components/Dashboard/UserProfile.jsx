import React from 'react';

export default function UserProfile({ isMobile = false }) {
  if (isMobile) {
    return (
      <div className="flex flex-shrink-0 bg-gray-700 p-4 overflow-hidden">
        <a href="#" className="group block flex-shrink-0">
          <div className="flex items-center">
            <ProfileIcon isMobile={isMobile} />
            <ProfileDetails isMobile={isMobile} />
          </div>
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-shrink-0 bg-gray-700 p-4 overflow-hidden">
      <a href="#" className="group block w-full flex-shrink-0">
        <div className="flex items-center">
          <ProfileIcon isMobile={isMobile} />
          <ProfileDetails isMobile={isMobile} />
        </div>
      </a>
    </div>
  );
}

const ProfileIcon = () => (
  <div>
    <div className="inline-block h-9 w-9 rounded-full bg-gray-200" />
    {/*<img*/}
    {/*  className="inline-block h-9 w-9 rounded-full"*/}
    {/*  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
    {/*  alt=""*/}
    {/*/>*/}
  </div>
);

const ProfileDetails = ({
  isMobile,
  heading = 'User#0x000000000',
  subHeading = 'Connect Account (coming soon)',
}) => {
  if (isMobile)
    return (
      <div className="ml-3">
        <p className="text-base font-medium text-white">{heading}</p>
        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300 text-ellipsis">
          {subHeading}
        </p>
      </div>
    );

  return (
    <div className="ml-3">
      <p className="text-sm font-medium text-white">{heading}</p>
      <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200 truncate">
        {subHeading}
      </p>
    </div>
  );
};
