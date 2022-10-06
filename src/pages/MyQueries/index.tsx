/**
 * -TEJAS LADHANI
 */

import React, { useState, useEffect, useContext } from 'react'
import {
  Layout, Row, Tabs, Col, Modal, Typography, Button, Spin
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { QueryCard } from '../../containers'
import { FormComp } from '../../components'
import data from './ModalConfig'

import './style.css'
import { UserContext } from '../../contexts/user'

const { TabPane } = Tabs
let tabkey = 0

const getTodaysDate = (): string => {
  /**
   * *Helper Funtion.
   * FUnction to get to current time =>
   *      used as timestamp in data that is being passed via API call, to the database.
   */

  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
  const yyyy = today.getFullYear()

  return `${dd}-${mm}-${yyyy}`
}

type queryListStateType = Array<{
  subject: string
  querystatus: {
    keyboardtype: any
    tag: any
    status: any
  }
  querydate: any
  querytime: any
  queryid: string
  querydesc: string
}>

export default function MyQueries (): JSX.Element {
  const { user } = useContext(UserContext)
  // state to maintain the list of all the queries receiving after the API CALL.
  const [QueryList, setQueryList] = useState<queryListStateType>()

  /**
   * temporary state
   *            to have REMOUNTING of the component so that,
   *            on re-mounting the useEffect will be executed => that will execute the API call.
   */
  const [countUpdate, setcountUpdate] = useState(0)

  /**
   * state to control the visibility of the MODAL.
   * MODAL is used to submit/create the query.
   */
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = (): void => {
    // sets the modal's state to ON => MODAL visible.
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    // handles the  behavior of onClick of OK button of createQuery Modal.
    // sets he modal's state to false => modal not visible.
    setIsModalVisible(false)
  }

  const handleCancel = (): void => {
    // handles the  behavior of onClick of X(CANCEL) button of createQuery Modal.
    // sets he modal's state to false => modal not visible.
    setIsModalVisible(false)
  }

  const useremail = user.idToken.payload.email

  const onCreateQuery = (val: {
    subject: string
    description: string
  }): void => {
    /**
     * Being called on OnSubmit of the Create Query Form.
     * Function is passed as prop to {FormComp} component.
     * {FormComp} component is being used by multiple components. => Hail Reusability.
     */
    const queryData = JSON.stringify({
      email: useremail,
      qObj: {
        querydate: getTodaysDate(),
        querystatus: {
          keyboardtype: 'danger',
          tag: 'UnSolved',
          status: 0
        },
        subject: val.subject,
        assignee: 'Alex',
        querytimestamp: new Date().toLocaleTimeString(),
        querydesc: val.description,
        queryid: uuidv4()
      }
    })

    const config = {
      method: 'put',
      url: 'https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/studentqueries',
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken}`,
        'Content-Type': 'application/json'
      },
      data: queryData
    }

    axios(config)
      .then((response) => {
        console.log(response)
        /**
         * As soon as the API CALL is SUCCESSFUL,
         * reset the CreateQuery Form => set the fields to empty state.
        */
        const profileFormElement = document.getElementById('ProfileForm') as HTMLFormElement
        if (profileFormElement) profileFormElement.reset()

        /** changing the CountUpdate state,
         *  just to remount component => re-calling of api => updated query list.
        */
        setcountUpdate(countUpdate + 1)

        // After the successful submission, we need to close the modal that is being popped up.
        handleCancel()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    /**
     * Defines the Effect on first-mount & re-mount of the component.
     * Depends on the CountUpdate state.
     */
    const config = {
      method: 'get',
      url: `https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/studentqueries?email=${useremail}`,
      headers: {
        Authorization: user.idToken.jwtToken
      }
    }

    axios(config)
      .then((response) => {
        // Received the List of queries , now storing this list in QueryList state.
        setQueryList(response.data.response.queries)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [countUpdate])

  /**
   * COMPONENT : createQuery Button
   */
  const createnewQuery = (
    <Button
      id="createquery"
      type="primary"
      shape="round"
      icon={<PlusCircleOutlined />}
      size="middle"
      onClick={showModal}
    >
      Create a Query
    </Button>
  )

  return (
    <div className="myquery">
      <Layout>
        <Row>

          <Col span={20}>
            <div className="myquery_TopTitle">
              <Typography.Title level={2}>My Queries</Typography.Title>
            </div>
          </Col>

          <Col span={23}>
            <Tabs tabBarExtraContent={createnewQuery}>
              <TabPane tab="All" key={tabkey++}>
                <Row>
                  <Col span={24}>
                    {
                      QueryList !== undefined
                        ? QueryList.map(
                          (query, index) => <QueryCard queryCardData={query} key={index} />
                        )
                        : <Spin />
                    }
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Solved" key={tabkey++}>
                <Row>
                  <Col span={24}>
                    {
                      QueryList !== undefined
                        ? QueryList.map(
                          (query) => (
                            query.querystatus.status ? <QueryCard queryCardData={query} /> : <div />
                          )
                        )
                        : <div />
                    }
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Pending" key={tabkey++}>
                <Row>
                  <Col span={24}>
                    {
                      QueryList !== undefined
                        ? QueryList.map(
                          (query) => (
                            query.querystatus.status ? null : <QueryCard queryCardData={query} />
                          )
                        )
                        : <div />
                    }
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Layout>

      {/* CreateQuery Modal */}
      <Modal title="Create Your Query" visible={isModalVisible} footer={null} onOk={handleOk} onCancel={handleCancel}>
        <FormComp
          from="myQueries"
          data={data}
          apiFunc={onCreateQuery}
          formState={{
            Subject: '',
            Description: ''
          }}
        />
      </Modal>

    </div>
  )
}
