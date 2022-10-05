import './style.css';
import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function ProfilePicCard() {
  return (
    <div className="ProfilePicCard">
      <div className="ProfileImg">
        <Avatar shape="square" size={200} icon={<UserOutlined />} />
      </div>
      <div className="ProfileFooter">
        <div style={{ marginRight: '0.8em' }}>
          <Button type="dashed">Remove</Button>
        </div>
        <div>
          <Button type="dashed">Upload</Button>
        </div>
      </div>
    </div>
  );
}
