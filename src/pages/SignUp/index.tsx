import React, { useContext, useEffect, useState } from 'react'
import {
  Button, DatePicker, Form, Input, message, Modal, Select
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import UserPool from '../../UserPool'
import './style.css'
import { UserContext } from '../../contexts/user'

export default function SignUp (): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  /**
   * If user exists, redirect to the homepage.
   */
  useEffect(() => {
    if (user) {
      navigate('/s/')
    }
  }, [])

  /**
   * It shows a modal when the user clicks on the button.
   * Modal, is used to show the confirmation of the registration.
   */
  const showModal = (): void => {
    setIsModalVisible(true)
  }

  const handleOk = (): void => {
    setIsModalVisible(false)
    navigate('/login')
  }

  const handleCancel = (): void => {
    setIsModalVisible(false)
  }

  const onFinish = (values: any): void => {
    /**
     * Creates a new user in the user pool.
     */

    /**
     * if password and confirm password are not equal, show an error message.
     */
    if (values.password !== values.confirmPassword) {
      message.error('Password does not match')
      return
    }

    // /!undefined == True.

    if (!values) return

    /**
     * Attributes are attached to the user identity.
     */
    const attributeList: any[] = [];
    ['name', 'email', 'birthdate', 'gender'].forEach((attribute) => {
      attributeList.push({
        Name: attribute,
        Value: values[attribute]
      })
    })

    const phoneNumber = `+91${values.phone_number}`
    attributeList.push({
      Name: 'phone_number',
      Value: phoneNumber
    })

    UserPool.signUp(
      values.email,
      values.password,
      attributeList,
      [],
      (err, result) => {
        if (err != null) {
          message.error(err.message)
        }
        if ((err == null) && (result != null)) {
          message.success('Sign up successfully!')
          showModal()
        }
      }
    )
  }

  return (
    <>
      <Modal
        title="🎊 Welcome 🎊"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Welcome, on board!!🙋‍♂️</h3>
        <p>
          We have sent a confirmation link at your registered email address.
        </p>
      </Modal>
      <section className="signUp">
        <img
          src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="..."
        />

        <div className="signup-container">
          <Form
            name="normal_login"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!'
                },
                {
                  type: 'email',
                  message: 'Please input a valid email!'
                }
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!'
                },
                {
                  type: 'string',
                  message: 'Must not contain numbers and special characters'
                },
                {
                  min: 3,
                  message: 'Name must be at least 3 characters'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: 'Please input your Birth date!'
                }
              ]}
            >
              <DatePicker format="DD-MM-YYYY" placeholder="Birth Date" />
            </Form.Item>

            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: 'please select you gender!'
                },
                {
                  enum: ['Male', 'Female', 'Other'],
                  message: 'Please select from given options'
                }
              ]}
            >
              <Select placeholder="Gender">
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!'
                },
                {
                  len: 10,
                  message: 'Phone number must be 10 digits'
                }
              ]}
            >
              <Input addonBefore="+91" placeholder="Phone number" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters'
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase, one lowercase, one number and one special character'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!'
                },
                {
                  min: 8,
                  message: 'Password must be at least 8 characters'
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase, one lowercase, one number and one special character'
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>
              {' '}
              Or
              {' '}
              <Link to="/login">Already, an user ?</Link>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  )
}
