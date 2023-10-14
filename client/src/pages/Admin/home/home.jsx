import React, { useState } from 'react';
import Vnavbar from '../../../components/Admin/verNavbar/Vnavbar';
import Navbar from '../../../components/Admin/Navbar/Navbar';
import Dashboard from '../../../components/Admin/Dashboard/Dashboard';
import Users from '../../../components/Admin/Users/Users';
import Verification from '../../../components/Admin/Verification/Verification';
import AbuseHandling from '../../../components/Admin/Abusehandling/AbuseHandling';

const Home = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  // Create a mapping of menu titles to their corresponding components
  const componentMap = {
    Dashboard: Dashboard,
    Users: Users,
    Verifications: Verification,
    'Abuse Handling': AbuseHandling,
  };

  const SelectedComponent = componentMap[selectedMenuItem];

  return (
    <div style={{ display: 'flex', marginTop: 0 }}>
      <Vnavbar  />
      <div style={{ flex: '1', paddingTop: 0 }}>
        <Navbar />
        <div className="mt-4" style={{ width: '100%' }}>
        <Dashboard/>
        </div>
      </div>
    </div>
  );
};

export default Home;
