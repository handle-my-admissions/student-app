import { CalendarOutlined, FileOutlined, PieChartOutlined, ProfileOutlined, PushpinOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppHeader, AppSider } from './components'
import { ApplicationContextProvider } from './contexts/applicationContext'
import { UserContextProvider } from './contexts/user'
import { Routes } from './routes'

const { Content } = Layout

const siderData = [
  { title: 'Dashboard', linkTo: '/s/', icon: <PieChartOutlined /> },
  {
    title: 'My Applications',
    linkTo: '/s/myapplications',
    icon: <ProfileOutlined />
  },
  { title: 'Documents', linkTo: '/s/docs', icon: <FileOutlined /> },
  { title: 'Calendar', linkTo: '/s/calendar', icon: <CalendarOutlined /> },
  { title: 'My Queries', linkTo: '/s/myqueries', icon: <QuestionOutlined /> },
  { title: 'Notices', linkTo: '/s/notices', icon: <PushpinOutlined /> },
  { title: 'Profile', linkTo: '/s/profile', icon: <UserOutlined /> }
]

function App (): JSX.Element {
  return (
    <BrowserRouter basename="/ap-student">
      <UserContextProvider>
        <ApplicationContextProvider>
          <Layout style={{ minHeight: '100vh' }}>
            <AppHeader />

            <Layout className="site-layout">
              <AppSider data={siderData} haveSubMenu isCollapsible />
              <Layout style={{ minHeight: '100vh' }}>
                <Content style={{ margin: '0 4px' }}>
                  <Routes />
                </Content>
              </Layout>
            </Layout>
          </Layout>

        </ApplicationContextProvider>
      </UserContextProvider>

    </BrowserRouter >
  )
}

export default App
