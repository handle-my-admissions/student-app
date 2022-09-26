import './style.css';
import React, { useContext } from 'react';
import { Layout } from 'antd';
import UserDropdown from '../UserDropdown';
import { UserContext } from '../../contexts/user';

function AppHeader() {
  const { Header } = Layout;
  const { user } = useContext(UserContext);

  return (
    <Header className="site-layout-background Header">
      <div className="header-container">
        <div className="logo">
          <span> 👨‍🎓 ad</span>
          <span>MISSION</span>
        </div>
        <div className="logout">
          {user && <UserDropdown />}
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
