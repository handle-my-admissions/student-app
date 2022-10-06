import { Divider, Typography } from 'antd'
import React from 'react'
import './style.css'
import { ViewNotices } from '../../containers'

export default function Notices (): JSX.Element {
  return (
    <div className="Notices">
      {/* <PageHeader title="Notices" /> */}
      <Typography.Title
        level={4}
        style={{ paddingTop: '0.7em', marginLeft: '0.6em' }}
      >
        Notices
      </Typography.Title>
      <Divider />
      <ViewNotices />
    </div>
  )
}
