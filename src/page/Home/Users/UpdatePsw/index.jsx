import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom'
import HttpUtil from '../../../../Util/httpUtil';

export default function UpdatePsw () {
    

   const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

        
        // const { id } = this.props.match.params
        // const id = 1
        const { id } = useParams()

        const onFinish = function (values) {
            console.log('Success:', values);
            HttpUtil.updatePwd({
                _id: id,
                modifiedpassword: values.modifiedpassword
            })
        };
        return (
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {/* <Form.Item
                    label="用户姓名"
                    name="name"

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="用户账号"
                    name="useraccount"

                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="原密码"
                    name="userpwd"

                >
                    <Input />
                </Form.Item> */}

                <Form.Item
                    label="新密码"
                    name="modifiedpassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your modifiedpassword!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>



                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        提交修改
                    </Button>
                </Form.Item>
            </Form>
        )
    
}
