import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Notification from './components/Notifications';

const Main: React.FC = () => {
  const userBalance = 1234.56;

  const carouselImages = [
    'https://via.placeholder.com/600x300/007bff/ffffff?text=Image+1',
    'https://via.placeholder.com/600x300/ff5733/ffffff?text=Image+2',
    'https://via.placeholder.com/600x300/33c1ff/ffffff?text=Image+3',
  ];

  return (
    <div className="Main">
      <Navbar balance={userBalance} />
      <Carousel images={carouselImages} />
      <Notification />
      {/* Other components or content here */}
    </div>
  );
};

export default Main;
