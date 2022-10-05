import {
    Button, Form, Input, message,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user';
import './style.css';

export default function Login() {
    const navigate = useNavigate();
    const { authenticate, user, setUser } = useContext(UserContext);
    useEffect(() => {
        if (user) {
            navigate('/s/');
        }
    }, []);

    const onFinish = (values: { email: string, password: string }) => {
        authenticate(values.email, values.password)
            .then((data) => {
                setUser(data);
                navigate('/s/');
            })
            .catch((err) => {
                message.error(err.message);
            });
    };

    return (
        <section className="login-showcase">
            <img src="https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="..." />
            <div className="login-container">
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please input a valid email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link className="login-form-forgot" to="/">
                            Forgot password
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        {' '}
                        Or
                        {' '}
                        <Link to="/signup">Sign up, now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}
