import Countdown from '../CountDown.jsx';
import { MenuButton } from './Buttons.jsx';
import { useStore } from '../../store.jsx';

export default function Main({ children, openSidebar }) {
  const { isLoading, fetchData, data } = useStore();

  const fetchNewData = () => {
    fetchData();
    console.log('fetching new data');
  };

  return (
    <div className="flex flex-1 flex-col md:pl-64">
      <div className="sticky top-0 z-10 bg-lisbon-500 text-lisbon-50 px-1 sm:pl-3 sm:py-1.5 flex items-center relative justify-between md:hidden">
        <MenuButton onClick={openSidebar} />
        {isLoading ? (
          <div />
        ) : (
          <div className="inline-flex items-center text-sm">
            <span className="hidden xs:inline-block pr-2">refreshing in</span>
            <Countdown
              initialCount={30}
              restart={data?.block_number}
              onCountFinished={fetchNewData}
            />
          </div>
        )}
        <h1 className="text-2xl font-semibold absolute left-0 right-0 text-center top-2 sm:top-3 pointer-events-none">
          Dashboard
        </h1>
      </div>
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 hidden md:flex flex-row text-lisbon-100 justify-between items-center pb-2.5 ">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            {isLoading ? (
              <div />
            ) : (
              <div className="inline-flex items-center">
                <span className="inline-block pr-2">refreshing in</span>
                <Countdown
                  initialCount={30}
                  restart={data?.block_number}
                  onCountFinished={fetchNewData}
                />
              </div>
            )}
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 text-lisbon-200">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
