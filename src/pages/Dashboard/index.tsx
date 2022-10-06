/**
 * SDashboard , is dashboard which will be displayed to the users which are having role===student
 * can be re-utilized by other components.
 *
 * TODO:  break it into reusable small components.
 * TODO:  Move notificationContainer to separate component (already there)
 *
 * Written By : Tejas Ladhani
 */
import React, { useContext } from 'react'
import {
  Row, Col, Layout, Typography, Steps
} from 'antd'
import { DashboardCard } from '../../components'
import './style.css'
import { UserContext } from '../../contexts/user'

export default function DashBoard (): JSX.Element {
  const { user } = useContext(UserContext)

  const getUserName = (): string => {
    const userPayLoad = user.idToken.payload
    return userPayLoad.name
  }

  return (
    <div className="SDashboard" style={{ marginTop: '1.5em' }}>
      <Layout style={{ minHeight: '85vh' }}>
        <Row>
          <Col xs={24} xl={24}>
            <div className="SDashboard_TopTitle">
              <Typography.Title level={3}>
                Greetings
                {' '}
                {getUserName().toUpperCase()}
                {' '}
                !
              </Typography.Title>
            </div>
          </Col>
          <Col xs={24} xl={24}>
            <div className="SDashboard_SubTitle">
              <Typography.Text type="secondary">
                Welcome to Admission Portal of XYZ university.Choose form any of
                the below options, to continue your at XYZ university.
              </Typography.Text>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col md={16}>
            <Row gutter={[8, 8]}>
              <Col md={12} className="gutter-row">
                <DashboardCard
                  title="Last Active Form"
                  subSpan={['Continue']}
                />
              </Col>
              <Col md={12} className="gutter-row">
                <DashboardCard
                  title="My Applications"
                  subSpan={['6 in progress', '0 completed']}
                />
              </Col>
              <Col md={24} className="gutter-row">
                <DashboardCard
                  title="My Queries"
                  subSpan={['4 open', '0 in progress', '1 closed']}
                />
              </Col>
              <Col md={24} className="gutter-row">
                <DashboardCard
                  title="Program Finder"
                  subSpan={['22 programs available']}
                />
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <div className="SDashboard_NotificationContainer">
              <div style={{ paddingTop: '0.6em', paddingLeft: '0.6em' }}>
                <Typography.Title level={4}>
                  Latest Notifications
                </Typography.Title>
              </div>
              <div
                style={{ paddingLeft: '1.5em' }}
                className="SDashboard_NotificationContainer_Body"
              >
                <Steps direction="vertical" progressDot current={101}>
                  <Steps.Step
                    title="Join our experts in an exclusive webinar on 'Careers after BTECH'"
                    description=" 15 Oct 2021"
                  />
                  <Steps.Step
                    title="results of Aptitude Test phase 1 is out"
                    description="12 Oct 2021"
                  />
                  <Steps.Step
                    title="Last date to submit your Application form has been extended till 31st Oct 2021."
                    description="12 Oct 2021"
                  />
                  <Steps.Step
                    title="Join our experts in an exclusive webinar on 'Careers after BTECH'"
                    description=" 15 Oct 2021"
                  />
                  <Steps.Step
                    title="results of Aptitude Test phase 1 is out"
                    description="12 Oct 2021"
                  />
                </Steps>
              </div>
            </div>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}
