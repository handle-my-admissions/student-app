/**
 * renders out the card that will have ->
 *              TITLE , SUBTITLE (e.g 2 in progress | 3 completed), NEXT BUTTON
 * This Component is being utilized by the dashboard component.
 *
 * Written By: Tejas ladhani
 */
import React from 'react'
import './style.css'
import { Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

interface dashboardCardPropType {
  title: string
  subSpan: string[]
}

export default function DashboardCard ({ title, subSpan }: dashboardCardPropType): JSX.Element {
  return (
    <div className="SDashboard_Card">
      <div className="SDashboard_Card_Title">
        <Typography.Title level={4}>{title}</Typography.Title>
      </div>
      <div className="SDashboard_Card_Body">
        <div className="SDashboard_Card_Bodytext">
          <Typography.Text>
            {subSpan.map((item, index) => (
              <span key={index}>{`${item} | `}</span>
            ))}
          </Typography.Text>
        </div>
        <div className="SDashboard_Card_BodySymbol">
          <ArrowRightOutlined />
        </div>
      </div>
    </div>
  )
}
