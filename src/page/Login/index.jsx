import React, { Component } from 'react'
import { Button, Checkbox, Form, Input,message } from 'antd';
import { Link } from 'react-router-dom'
import HttpUtil from '../../Util/httpUtil';
import Description from './Description'
import './index.css'
import 'antd/dist/antd.min.css'

const onFinish = (values) => {
  console.log('Success:', values);
  const { username, password } = values
  const data = {
    adminaccount: username,
    adminpwd: password
  }
  const hideloading = message.loading("请求中")
  HttpUtil.login(data).then((res) => {
    hideloading()
    message.success('登录成功')
    localStorage.setItem('token', res.data.token)
    window.location.href = '/home/users'
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
        <Description/>
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

