/**
 * TODO: dynamic Steps
 * Written by :Tejas Ladhani
 */
import React from 'react';
import { Steps } from 'antd';

export default function ApplicationSteps() {
  return (
    <Steps
      type="navigation"
      current={1}
      onChange={() => {}}
      size="small"
      className="ApplicationSteps"
    >
      <Steps.Step status="finish" icon="" title="Personal Details" />
      <Steps.Step status="process" icon="" title="Contact Information" />
      <Steps.Step status="wait" icon="" title="Documents" />
      <Steps.Step status="wait" icon={<div />} title="Payment" />
    </Steps>
  );
}
