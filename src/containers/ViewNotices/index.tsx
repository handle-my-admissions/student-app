/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import {
  Skeleton, Card, Row, Col, Spin,
} from 'antd';
import { EditOutlined, EllipsisOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './style.css';
import { UserContext } from '../../contexts/user';

const { Meta } = Card;

export default function ViewNotices() {
  const { user } = useContext(UserContext);
  const [Notices, setNotices] = useState<any>();
  // const [IsLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/notices',
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken}`,
      },
    };

    axios(config)
      .then((response) => {
        const result = JSON.parse(response.data);
        if (result.ResponseMetadata.HTTPStatusCode == 200) { setNotices(result.Items); }
      })
      .catch();
  }, []);
  return (
    <div className="ViewNotices">
      {/* <PageHeader title="View Notices" /> */}
      <Row gutter={24}>
        {Notices == undefined ? <Spin /> : Notices.map((item: any, index: number) => (
          <Col key={index} sm={24} md={12} lg={6} xl={6}>
            <Card
              style={{ width: 300, marginTop: 16 }}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
              extra={item.NoticeID}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  title={item.title}
                  description={<span>{item.description}</span>}
                />
              </Skeleton>
            </Card>
          </Col>
        ))}

      </Row>
    </div>
  );
}
