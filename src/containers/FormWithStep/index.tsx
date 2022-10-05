/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import {
  Steps, Button, message, Row, Col,
} from 'antd';
import axios from 'axios';
import PaymentButton from '../../components/PaymentButton';
import { UserContext } from '../../contexts/user';

const { Step } = Steps;

const steps = [
  {
    title: 'Personal Details',
  },
  {
    title: 'School Details',
  },
  {
    title: 'Entrance Exam',
  },
  {
    title: 'Ed Details',
  },
  {
    title: 'Documents Upload',
  },
  {
    title: 'Payment',
  },
];

export default function FormWithStep({ application }: { application: any }) {
  const { user } = useContext(UserContext);
  //   console.log("from form step", application);
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // !check this
  const [ClickedOnEdit] = useState(false);
  const { ApplicationID } = application;
  const fields = application.GlobalLabels;

  const PersonalDetails = fields['Personal Details'];
  const SchoolDetails = fields['Education/School Details'];
  const EntranceExam = fields['Entrance Exam'];
  const EdDetails = fields['Ed-Level Details'];
  const DocumentUploads = fields['Document Uploads'];

  const [PaymentInfo, setPaymentInfo] = useState({
    order_id: '',
    payment_id: '',
  });
  const [formData, setFormData] = useState({
    ApplicationID,
    PersonalDetails,
    SchoolDetails,
    EntranceExam,
    EdDetails,
    DocumentUploads,
    PaymentInfo,
  });

  // console.log(formData.PersonalDetails);
  const userEmail = user.idToken.payload.email;
  const getTodaysDate = () => {
    const timestamp = Date.now();
    return timestamp;
  };

  // get the submitted data from the database if present.
  const getSavedData = () => {
    const config = {
      method: 'get',
      url: `https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/Get_Submitted_Applications?id=${ApplicationID}_${user.idToken.payload.email}`,
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken}`,
        'Content-Type': 'application/json',
      },
    };
    axios(config)
      .then((response) => {
        // this is the submission data if it exists
        const preliminaryData = response.data.body;
        setFormData(preliminaryData.Item.submission[0].submissiondata);
      })
      .catch(() => {
        // error handling
        message.error('Something went wrong, please try again later.');
      });
  };

  const ApiFunction = (val: any) => {
    const data = {
      applicationid: val.ApplicationID,
      email: userEmail,
      submission: {
        submissiontimestamp: getTodaysDate(),
        submissiondata: val,
      },
    };

    const config = {
      method: 'put',
      url: 'https://0icg981cjj.execute-api.us-east-1.amazonaws.com/d1/putapplication',
      headers: {
        Authorization: `Bearer ${user.idToken.jwtToken}`,
        'Content-Type': 'application/json',
      },
      data,
    };

    axios(config)
      .then(() => {
        message.success('saved!');
      })
      .catch(() => {
        message.error('You offline ?');
      });
  };

  useEffect(() => {
    getSavedData();
  }, []);

  return (
    <div className="FormWithSteps">
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <Row>
          <Col span={24}>
            <form autoComplete="off" onSubmit={onSubmit} id="DetailForm">
              {/* Personal Details */}
              {current === 0
                && PersonalDetails.map((item: any, index: number) => (
                  <div className="personalDetails">
                    <br />
                    {' '}
                    <label>{item.title}</label>
                    <br />
                    {item.type !== 'option' && (
                      <input
                        type={item.type}
                        value={
                          formData.PersonalDetails[0][index] === undefined
                            ? ''
                            : formData.PersonalDetails[0][index].value
                        }
                        onChange={(e) => {
                          PersonalDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            PersonalDetails: [{ ...PersonalDetails }],
                          });
                        }}
                        required
                        disabled={ClickedOnEdit}
                      />
                    )}
                    {item.type === 'option' && item.title === 'Gender' && (
                      <select
                        value={
                          formData.PersonalDetails[0][index] === undefined
                            ? ''
                            : formData.PersonalDetails[0][index].value
                        }
                        onChange={(e) => {
                          PersonalDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            PersonalDetails: [{ ...PersonalDetails }],
                          });
                        }}
                        required
                        disabled={ClickedOnEdit}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    )}
                  </div>
                ))}

              {/* School Details */}
              {current === 1
                && SchoolDetails.map((item: any, index: number) => (
                  <div className="schooldetails">
                    <br />
                    {' '}
                    <label>{item.title}</label>
                    <br />
                    <input
                      type="text"
                      value={
                        formData.SchoolDetails[0][index] === undefined
                          ? ''
                          : formData.SchoolDetails[0][index].value
                      }
                      onChange={(e) => {
                        SchoolDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          SchoolDetails: [{ ...SchoolDetails }],
                        });
                      }}
                      required
                      disabled={ClickedOnEdit}
                    />
                  </div>
                ))}

              {/* Entrance Exam */}
              {current === 2
                && EntranceExam.map((item: any, index: number) => (
                  <div className="entranceExamDetails">
                    <br />
                    {' '}
                    <label>{item.title}</label>
                    <br />
                    {item.type !== 'option' && (
                      <input
                        type={item.type}
                        value={
                          formData.EntranceExam[0][index] === undefined
                            ? ''
                            : formData.EntranceExam[0][index].value
                        }
                        onChange={(e) => {
                          EntranceExam[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            EntranceExam: [{ ...EntranceExam }],
                          });
                        }}
                        required
                        disabled={ClickedOnEdit}
                      />
                    )}
                    {item.type === 'option' && item.title === 'Status' && (
                      <select
                        value={
                          formData.PersonalDetails[0][index] === undefined
                            ? ''
                            : formData.PersonalDetails[0][index].value
                        }
                        onChange={(e) => {
                          PersonalDetails[index].value = e.target.value;
                          setFormData({
                            ...formData,
                            PersonalDetails: [{ ...PersonalDetails }],
                          });
                        }}
                        required
                        disabled={ClickedOnEdit}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Results Declared">
                          Results declared
                        </option>
                      </select>
                    )}
                  </div>
                ))}

              {/* Education Details */}
              {current === 3
                && EdDetails.map((item: any, index: number) => (
                  <div>
                    <br />
                    {' '}
                    <label>{item.title}</label>
                    <br />
                    <input
                      type="text"
                      value={
                        formData.EdDetails[0][index] === undefined
                          ? ''
                          : formData.EdDetails[0][index].value
                      }
                      onChange={(e) => {
                        EdDetails[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          EdDetails: [{ ...EdDetails }],
                        });
                      }}
                      required
                      disabled={ClickedOnEdit}
                    />
                  </div>
                ))}

              {/* Document Upload Details */}
              {current === 4
                && DocumentUploads.map((item: any, index: number) => (
                  <div>
                    <br />
                    {' '}
                    <label>{item.title}</label>
                    <br />
                    <input
                      type="file"
                      value={
                        formData.DocumentUploads[0][index] === undefined
                          ? ''
                          : formData.DocumentUploads[0][index].value
                      }
                      onChange={(e) => {
                        DocumentUploads[index].value = e.target.value;
                        setFormData({
                          ...formData,
                          DocumentUploads: [{ ...DocumentUploads }],
                        });
                      }}
                      required
                      disabled={ClickedOnEdit}
                    />
                  </div>
                ))}
              {current === 5 && (
                <PaymentButton
                  amount={application.fees}
                  applicationId={ApplicationID}
                  // PaymentInfo={PaymentInfo}
                  setPaymentInfo={setPaymentInfo}
                />
              )}
            </form>
          </Col>
        </Row>
      </div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              next();
              ApiFunction({ ...formData, PaymentInfo });
            }}
          >
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              message.success('Processing complete!');
            }}
          >
            Submit Application
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
}
