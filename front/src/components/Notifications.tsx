import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

const Notification: React.FC = () => {
  return (
    <div className="notification">
      <FontAwesomeIcon icon={faBell} className="notification__bell" />
      <span className="notification__text">Lorem ipsum lorem ipsum lorem ipsum</span>
    </div>
  );
};

export default Notification;