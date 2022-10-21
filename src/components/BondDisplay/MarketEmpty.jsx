import { OmegaIcon } from '../Icons.jsx';
import { PrimaryButton } from '../Buttons.jsx';
import { PlusIcon } from '@heroicons/react/20/solid/index.js';
import React from 'react';

export default function MarketEmpty({ action = false, children }) {
  return (
    <div className="text-center pb-4">
      <Canvas>
        <Bond style={{ left: 'calc(50% + 10px)', top: 'calc(50% + 5px)' }} />
        <Bond style={{ left: 'calc(50%)', top: 'calc(50%)' }} />
        <Bond style={{ left: 'calc(50% - 10px)', top: 'calc(50% - 5px)' }} />
      </Canvas>
      <h4 className="mt-2 font-medium">{children}</h4>
      {action && (
        <div className="mt-6">
          <PrimaryButton size="md">
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {action.text || 'Add Liquidity (coming soon)'}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

function Canvas({ children }) {
  return (
    <div
      data-name="Canvas"
      className="w-1/2 min-w-[200px] mx-auto relative min-h-[150px]"
    >
      {children}
    </div>
  );
}

function Bond({ style }) {
  return (
    <div
      data-name="bond animated"
      style={style}
      className="bg-lisbon-600 border border-2 border-lisbon-300 w-[120px] h-[50px] rounded absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
    >
      <OmegaIcon size={20} />
    </div>
  );
}
