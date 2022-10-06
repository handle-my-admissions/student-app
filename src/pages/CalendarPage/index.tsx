import React from 'react'
import { Calendar, PageHeader } from '../../components'

export default function CalendarPage (): JSX.Element {
  return (
    <div className="Calendar">
      <PageHeader title="Calendar" />
      <br />
      <Calendar />
    </div>
  )
}
