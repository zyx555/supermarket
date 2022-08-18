import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Skeleton,PageHeader } from 'antd';
import { useParams } from 'react-router-dom'
import HttpUtil from '../../../../Util/httpUtil';
import Description from '../Description'

export default function UpdatePsw() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { id } = useParams()
    const goBack = function(){
        window.location.href='/home/users'
    }
    const onFinish = function (values) {
        console.log('Success:', values);
        HttpUtil.updatePwd({
            _id: id,
            modifiedpassword: values.modifiedpassword
        }).then(() => {
            values=''
            message.success('修改成功')
            goBack()
            
        })
    };

    useEffect(() => {
        HttpUtil.getUser({ _id: id }).then((res) => {
           
            setLoading(false)
            setUser(res.data.user)
        })
    }, [setLoading, setUser])

    return (
        <div>
            <Description/>
        <PageHeader
          className="site-page-header"
          onBack={() => {
         goBack()
          }}
          subTitle="用户信息管理/修改用户密码"
          style={{ paddingLeft: 10 }}
        />
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
            <Form.Item
                label="用户姓名"
                name="name"
                required={false}
                initialValue={user.name}

            >
                <Input hidden />
                {loading ? (
                    <Skeleton.Input
                        style={{ width: 200, borderRadius: 3 }}
                        active={true}
                        size="small"
                    />
                ) : (
                    user.name
                )}
            </Form.Item>
            <Form.Item
                label="用户账号"
                name="useraccount"
                required={false}
                initialValue={user.useraccoun}
            >
                <Input hidden />
                {loading ? (
                    <Skeleton.Input
                        style={{ width: 200, borderRadius: 3 }}
                        active={true}
                        size="small"
                    />
                ) : (
                    user.useraccount
                )}
            </Form.Item>

            <Form.Item
                label="原密码"
                name="userpwd"
                required={false}
                initialValue={user.userpwd}
            >
                <Input hidden />
                {loading ? (
                    <Skeleton.Input
                        style={{ width: 200, borderRadius: 3 }}
                        active={true}
                        size="small"
                    />
                ) : (
                    user.userpwd
                )}
            </Form.Item>
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
        </div>
    )

}
