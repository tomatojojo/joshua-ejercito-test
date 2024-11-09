import React from 'react';
import Navbar from './components/Navbar';

const Main: React.FC = () => {
  const userBalance = 1234.56;

  return (
    <div className="Main">
      <Navbar balance={userBalance} />
      {/* Other components or content here */}
    </div>
  );
};

export default Main;
