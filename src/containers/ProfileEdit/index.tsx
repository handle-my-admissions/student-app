/**
 * Serves as the Profile component for the student as well as admin user.
 * uses ProfilePicCard, FormComp
 *
 * Written By: Tejas Ladhani
 */

import { Row, Col, Typography } from 'antd';
import React, { useContext } from 'react';
import { FormComp } from '../../components';
import { UserContext } from '../../contexts/user';
import ProfilePicCard from '../ProfilePicCard/index';

const { Title } = Typography;

export default function ProfileEdit() {
  const { user } = useContext(UserContext);
  const apiFunc = (val: any) => {
    // console.log(val);
    if (user) {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${user.idToken.jwtToken}`);
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        email: user.idToken.payload.email,
        nationality: val.Nationality,
        dob: val.dateofbirth,
        gender: val.gender,
        name: val.firstname,
        lastname: val.lastname,
        phone: val.phone,
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      } as RequestInit;

      fetch('https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/items', requestOptions)
        .then((response) => response.text())
        .then()
        .catch();

      const profileFormElement = document.getElementById('ProfileForm') as any;
      profileFormElement.reset();
    }
  };
  const data = [
    {
      name: 'firstname',
      label: 'First Name',
      rules: [
        {
          type: 'string',
          message: 'Must not contain numbers and special characters',
        },
        {
          required: true,
          message: 'Please input your name!',
        },
      ],
      haveOption: false,

    },
    {
      name: 'lastname',
      label: 'Last Name',
      rules: [
        {
          type: 'string',
          message: 'Must not contain numbers and special characters',
        },
        {
          required: true,
          message: 'Please input your name!',
        },
      ],
      haveOption: false,
    },
    {
      name: 'dateofbirth',
      label: 'Date of Birth',
      rules: [
        {
          type: 'date',
          message: 'Enter the DOB',
        },
        {
          required: false,
          message: 'DOb is required!',
        },
      ],
      haveOption: false,
    },
    {
      name: 'gender',
      label: 'Gender',
      rules: [
        {
          required: false,
          message: 'Please select gender!',
        },
      ],
      haveOption: true,
      options: ['Male', 'Female', 'Other'],

    },
    {
      name: 'phone',
      label: 'Phone Number',
      rules: [
        {
          required: true,
          message: 'Please input your phone number!',
        },
      ],
      haveOption: false,
    },
    {
      name: 'Nationality',
      label: 'Nationality',
      rules: [
        {
          type: 'string',
          message: 'Must not contain numbers and special characters',
        },
        {
          required: true,
          message: 'Please input your nationality!',
        },
      ],

    },

  ];

  return (
    <>
      <Row style={{ marginTop: '1.2em' }}>
        <Title level={3}>Edit Profile</Title>
      </Row>
      <Row style={{ marginTop: '1.2em' }}>
        <Col xl={7} xs={24}>
          <ProfilePicCard />
        </Col>
        <Col xl={1} xs={0}>
          <div />
        </Col>
        <Col xl={16} xs={24}>
          <FormComp
            from="profile"
            data={data}
            apiFunc={apiFunc}
            formState={{
              FirstName: '',
              LastName: '',
              Phone: '',
              DOB: '',
              Gender: '',
              Nationality: '',
              Address: '',

            }}
          />
        </Col>
      </Row>
    </>
  );
}
