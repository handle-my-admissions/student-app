import {
  Row, Col, Divider, Typography, Tag, Avatar, Spin, message
} from 'antd'
import axios from 'axios'
import React, { useEffect, useContext, useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { UserContext } from '../../contexts/user'

import './style.css'

export default function ProfileDisplay (): JSX.Element {
  const { user } = useContext(UserContext)
  const [ProfileData, setProfileData] = useState<any>()
  const [count] = useState(0)

  useEffect(() => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_BASE_URL}/items?email=${user.idToken.payload.email}`,
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken}`
      }
    }

    axios(config)
      .then((response) => {
        const temp = JSON.parse(response.data)
        setProfileData(temp.body)
      })
      .catch(() => {
        message.error('Something went wrong, please try again later.')
      })
  }, [count])

  return (
    <>
      <Row style={{ marginTop: '1.2em' }}>
        <Col span={24}>
          <Typography.Title level={3}> Your Profile</Typography.Title>

          <Divider />
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Avatar shape="square" size={100} icon={<UserOutlined />} />
        </Col>
        <Col span={14}>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              {' '}
              Name :
              {ProfileData !== undefined ? ProfileData.name : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              Date Of Birth :
              {ProfileData !== undefined ? ProfileData.dob : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              Email :
              {ProfileData !== undefined ? ProfileData.email : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              Gender :
              {ProfileData !== undefined ? ProfileData.gender : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              Nationality :
              {ProfileData !== undefined ? ProfileData.nationality : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Typography.Title level={5}>
              Phone Number :
              {ProfileData !== undefined ? ProfileData.phone : <Spin />}
            </Typography.Title>
          </div>
          <div className="ProfileDataRender">
            <Tag color="magenta">No. Of Application : 5</Tag>
            <Tag color="red">Queries : 3</Tag>
            <Tag color="volcano">Pending : 7</Tag>
            <Tag color="orange">Solved Queries : 10</Tag>
            <Tag color="gold">No. Of Documents uploaded : 3</Tag>
            <Tag color="lime">No. Of Notices : 11</Tag>
          </div>
        </Col>
      </Row>
    </>
  )
}
