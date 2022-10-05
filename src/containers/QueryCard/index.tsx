/* eslint-disable react/prop-types */
/*
This is query card container,
accepts querydata and renders a card with data.
Written by Shrey Makwana
*/
import React from 'react';
import {
  Typography, Row, Col, Card,
} from 'antd';

type queryCardPropType = {
  queryCardData: {
    subject: string,
    querystatus: {
      keyboardtype: any,
      tag: any
    },
    querydate: any,
    querytime: any,
    queryid: string,
    querydesc: string,
  }
}

export default function QueryCard({ queryCardData }:queryCardPropType) {
  console.log('Hello');
  console.log(queryCardData);
  return (
    <div className="querycard">
      <Card size="small">
        <Row>
          <Col span={12}>
            <Typography.Title level={4}>{queryCardData.subject}</Typography.Title>
          </Col>
          <Col span={4}>
            <Typography.Text>Status: </Typography.Text>
            <Typography.Text keyboard type={queryCardData.querystatus.keyboardtype}>
              {queryCardData.querystatus.tag}
            </Typography.Text>
          </Col>
          <Col span={6} offset={2}>
            <Typography.Title level={5}>
              Created On :
              {' '}
              {queryCardData.querydate}
              {' '}
              {queryCardData.querytime}
            </Typography.Title>
          </Col>
        </Row>
        <details>
          <Row>
            <Col span={24}>
              <Typography.Text italic>
                Query ID:
                {queryCardData.queryid}
              </Typography.Text>
            </Col>
            <Col span={18}>
              <Typography.Text>
                Description :
                {queryCardData.querydesc}
              </Typography.Text>
            </Col>
          </Row>
        </details>
        <details>
          <summary>Responses</summary>
        </details>
      </Card>
    </div>
  );
}
