import React from 'react';
import './style.css';
import { Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default function ApplicationDownloadPanel() {
  const data = [{ text: 'Application Print' }, { text: 'Payment Receipt' }];

  return (
    <div className="ApplicationDownloadPanel">
      {data.map((item) => (
        <>
          <div className="ApplicationDownloadPanel_down">
            <DownloadOutlined style={{ color: 'blue' }} />
          </div>
          <div className="ApplicationDownloadPanel_text">
            <Typography.Text>{item.text}</Typography.Text>
          </div>
        </>
      ))}
    </div>
  );
}
