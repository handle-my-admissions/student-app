import React, { useContext, useEffect, useState } from 'react'
import { Layout, Typography } from 'antd'
import { useLocation } from 'react-router-dom'
import { FormWithStep } from '../../containers'
import './style.css'
import { ApplicationContext } from '../../contexts/applicationContext'

const Application = (): JSX.Element => {
  const location = useLocation()
  const { applicationDetails } = useContext(ApplicationContext)
  const [finalData, setFinalData] = useState()

  const id = location.pathname.split('/')[3]

  useEffect(() => {
    //! check this logic
    applicationDetails.forEach((item: any) => {
      console.log('hello')
      console.log(item)
      if (item.ApplicationID === id && item.ApplicationID !== undefined) {
        setFinalData(item)
      }
    })
  }, [])

  return (
    <div className="Application">
      <Layout style={{ padding: '2em' }}>
        <Typography.Title level={3}>Application</Typography.Title>
        {finalData !== undefined && <FormWithStep application={finalData} />}
      </Layout>
    </div>
  )
}

export default Application
