import React, { Component } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, Routes, Route, Outlet } from 'react-router-dom'
import HttpUtil from '../../Util/httpUtil';

// import Register from '../Register'
// import Home from '../Home'
import './index.css'
import 'antd/dist/antd.min.css'

const onFinish = (values) => {
  console.log('Success:', values);
  const { username, password } = values
  const data = {
    adminaccount: username,
    adminpwd: password
  }
  HttpUtil.login(data).then((res) => {
    localStorage.setItem('token', res.data.token)
    window.location.href = '/home'
  })
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export default class Login extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='content'>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="记住密码"
              valuePropName="checked"
              wrapperCol={{
                offset: 4,
                span: 16,
              }}
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 7,
                span: 16,
              }}
            >

              <Button type="primary" htmlType="submit">
                登录
              </Button>

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

              <Link to='/register'>
                <Button type="primary">
                  注册
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };

}

