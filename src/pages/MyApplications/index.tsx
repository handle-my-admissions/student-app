/**
 * TODO: need to define the proper breakpoints and its design
 * TODO: onClick behavior
 *
 * Flow: MyApplications -> ApplicationCard -> other small components.
 * Written By: Tejas Ladhani
 */
import './style.css'
import React, { useEffect, useState, useContext } from 'react'
import {
  Layout, Row, Col, Typography, Tabs, Spin, message
} from 'antd'
import axios from 'axios'
import { ApplicationCard } from '../../containers'
import { ApplicationContext } from '../../contexts/applicationContext'
import { UserContext } from '../../contexts/user'

const { TabPane } = Tabs

type applicationCardDataType = Array<{
  ApplicationID: string
  title: string
  fees: string
  lastDate: string
  subCard: Array<{
    title: string
    subtitle: string
  }>
  downloadPanelData: any[]
  stepsData: any[]
}>

const ApplicationCardData = [
  {
    title: 'BTech Application Form',
    ApplicationID: '123456789',
    fees: '1000',
    lastDate: '12/12/2020',
    subCard: [
      { title: 'Application No.', subtitle: '...' },
      { title: 'Application Fee', subtitle: '...' },
      { title: 'Last Date', subtitle: '...' },
      { title: 'Payment Mode', subtitle: '...' }
    ],
    downloadPanelData: [],
    stepsData: []
  }
]

export default function MyApplications (): JSX.Element {
  const { user } = useContext(UserContext)
  const [count] = useState(0)
  const [applicationCardDetails, setApplicationCardDetails] = useState<applicationCardDataType>(ApplicationCardData)
  const { setApplicationDetails } = useContext(ApplicationContext)
  let ApplicationCardDataV1 = []

  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/applications',
      headers: {
        Authorization: user.idToken.jwtToken
      }
    }

    axios(config)
      .then((response) => {
        ApplicationCardDataV1 = response.data.Items
        setApplicationCardDetails(ApplicationCardDataV1)
        // console.log(ApplicationCardDataV1);
        setApplicationDetails(ApplicationCardDataV1)
        // !check
        // ApplicationCardDataV1.map((item) => {
        //   // console.log(item["GlobalLabels"]["Payment Modes"].map(item => item.title));
        // });
      })
      .catch(() => {
        message.error('Something went wrong, please try again later.')
      })
  }, [count])

  return (
    <div className="myApplications" style={{ marginTop: '1.5em' }}>
      <Layout style={{ minHeight: '85vh' }}>
        <Row>
          <Col span={24}>
            <div className="myApplications_TopTitle">
              <Typography.Title level={2}>My Applications</Typography.Title>
            </div>
          </Col>
          <Col span={24}>
            <div className="myApplications_SubTitle">
              <Typography.Text type="secondary">
                Track all your applications for XYZ university from here.
              </Typography.Text>
            </div>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="1" onChange={() => { /** */ }}>
              <TabPane
                tab={`${applicationCardDetails.length} Applications(s) open`}
                key="1"
              >
                {applicationCardDetails.length < 2
                  ? (
                  <Spin />
                    )
                  : (
                      applicationCardDetails.map((data) => (
                      <ApplicationCard
                        key={data.ApplicationID}
                        title={data.title}
                        subCardData={[
                          {
                            title: 'Application No.',
                            subtitle: data.ApplicationID
                          },
                          { title: 'Application Fee', subtitle: data.fees },
                          { title: 'Last Date', subtitle: data.lastDate },
                          { title: 'Payment Mode', subtitle: 'online' }
                        ]}
                      // downloadPanelData={data.downloadPanelData}
                      // stepsData={data.stepsData}
                      />
                      ))
                    )}
              </TabPane>
              <TabPane tab="0 Application(s) completed" key="2">
                Completed Applications
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>
    </div>
  )
}
