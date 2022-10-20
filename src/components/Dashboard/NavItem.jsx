import { classNames } from '../../util/index.js';

export default function NavItem({ item, isMobile }) {
  if (isMobile) {
    return (
      <a
        href={item.href}
        className={classNames(
          item.current
            ? 'bg-lisbon-900 text-white'
            : 'text-lisbon-300 hover:bg-lisbon-700 hover:text-white',
          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
        )}
      >
        <item.icon
          className={classNames(
            item.current
              ? 'text-paris-300'
              : 'text-paris-400 group-hover:text-paris-300',
            'mr-4 flex-shrink-0 h-6 w-6'
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
    );
  }

  return (
    <a
      href={item.href}
      className={classNames(
        item.current
          ? 'bg-lisbon-900 text-white'
          : 'text-lisbon-300 hover:bg-lisbon-700 hover:text-white',
        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
      )}
    >
      <item.icon
        className={classNames(
          item.current
            ? 'text-lisbon-300'
            : 'text-lisbon-400 group-hover:text-lisbon-300',
          'mr-3 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {item.name}
    </a>
  );
}
