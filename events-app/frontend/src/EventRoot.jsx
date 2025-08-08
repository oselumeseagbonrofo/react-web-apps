import { Outlet } from 'react-router-dom';

// Assuming your EventNavigation component is in the components folder
import EventsNavigation from './components/EventsNavigation';

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </> 
  );
}

export default EventsRootLayout;
