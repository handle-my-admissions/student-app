import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserContext } from '../../contexts/user';


export default function UserDropdown() {
  const [visible, setVisible] = useState(false);
  const { user, setUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuClick:MenuProps['onClick'] = (e) => {
    if (e.key === '2') {
    // logout logic
      logout();
      setUser(undefined);
      setVisible(false);
      navigate('/');
    }
  };

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };
  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: `Username: ${user? user['idToken']['payload']['name']:''}`,
          key: '1',
        },
        {
          label: 'Logout',
          key: '2',
        },
      ]}
    />
  );
  return (
    <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={visible}>
      <Avatar icon={<UserOutlined />} />
    </Dropdown>
  );
}
