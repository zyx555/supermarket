import React from 'react'
import { Link } from 'react-router-dom'
import HttpUtil from '../../Util/httpUtil';
import {Button, Form, Input,message} from 'antd';
import Description from './Description';
import './index.css'
import 'antd/dist/antd.min.css'


const Register = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const { nickname, password, name } = values
    const hideloading = message.loading('请求中')
    HttpUtil.register(
      {
        name: name,
        adminaccount: nickname,
        adminpwd: password
      }
    ).then(() => {
      hideloading()
      message.success('注册成功')
        window.location.href = '/login'
      })

  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 18,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div className='wrapper'>
      <div className="content">
        <Description/>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
           <Form.Item
            name="name"
            label="姓名"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="账号"
            // tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

         

          <Form.Item {...tailFormItemLayout}>

            <Button type="primary" htmlType="submit">
              注册
            </Button>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/login'>
              < Button type="primary" >
                返回
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Register
