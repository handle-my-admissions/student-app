import { CalendarOutlined, FileOutlined, PieChartOutlined, ProfileOutlined, PushpinOutlined, QuestionOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppHeader, AppSider } from './components';
import { UserContextProvider } from './contexts/user';
import { Dashboard, Landing, Login, SignUp } from './pages';
import { PrivateRoute } from './utils/PrivateRoute';

const { Content } = Layout;

const siderData = [
  { title: 'Dashboard', linkTo: '/s/', icon: <PieChartOutlined /> },
  {
    title: 'My Applications',
    linkTo: '/s/myapplications',
    icon: <ProfileOutlined />,
  },
  { title: 'Documents', linkTo: '/s/docs', icon: <FileOutlined /> },
  { title: 'Calendar', linkTo: '/s/calendar', icon: <CalendarOutlined /> },
  { title: 'My Queries', linkTo: '/s/myqueries', icon: <QuestionOutlined /> },
  { title: 'Notices', linkTo: '/s/Notices', icon: <PushpinOutlined /> },
  { title: 'Profile', linkTo: '/s/Profile', icon: <UserOutlined /> },
];

function App() {
  return (
    <BrowserRouter basename="/ap-student">
      <UserContextProvider>
        <Layout style={{ minHeight: '100vh' }}>
          <AppHeader />

          <Layout className="site-layout">
            <AppSider data={siderData} haveSubMenu isCollapsible />
            <Layout style={{ minHeight: '100vh' }}>
              <Content style={{ margin: '0 4px' }}>
                <Routes>
                  <Route path='/' element={<Landing />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/s' element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }/>
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>


      </UserContextProvider>
    </BrowserRouter >
  );
}

export default App;
