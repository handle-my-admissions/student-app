import React from 'react'
import {
  EditFilled,
  SafetyCertificateFilled,
  SettingFilled,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Tabs } from 'antd'
import {
  ProfileDisplay, ProfileEdit, ProfileOther, ProfilePassAndSec
} from '../../containers'
import './style.css'

const { TabPane } = Tabs
const studentProfileData = [
  { title: 'Profile', component: <ProfileDisplay />, icon: <UserOutlined /> },
  { title: 'Edit Profile', component: <ProfileEdit />, icon: <EditFilled /> },
  { title: 'Password & Security', component: <ProfilePassAndSec />, icon: <SafetyCertificateFilled /> },
  { title: 'Other Settings', component: <ProfileOther />, icon: <SettingFilled /> }
]

export default function Profile (): JSX.Element {
  return (
    <div className="Profile" style={{ marginTop: '2em' }}>
      <Layout>
        <Tabs defaultActiveKey="1" tabPosition="left" style={{ minHeight: '80vh' }} type="card">
          {studentProfileData.map((i) => (
            <TabPane
              tab={(
                <span>
                  {i.icon}
                  {i.title}
                </span>
              )}
              key={i.title}
            >
              {i.component}
            </TabPane>
          ))}
        </Tabs>
      </Layout>

    </div>
  )
}
