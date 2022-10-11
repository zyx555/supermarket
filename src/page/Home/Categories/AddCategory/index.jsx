import React, { Component } from 'react'
import { Button, Form, Input, message, PageHeader, Space } from 'antd';
import HttpUtil from '../../../../Util/httpUtil'
import Description from '../Description';

export default class AddCategory extends Component {
  state = {
    curTotal: '5',
  }
  onFinish = (values) => {
    const { curTotal } = this.state

    HttpUtil.addCategory({
      categoryName: values.category,
      curTotal: curTotal
    }).then((res) => {
      message.success('商品分类新增成功')
      window.location.href='/home/categories'
    }
    )
  }
  onFinishFailed = (err) => {
    console.log(err)
  }
  goBack = () => {
    window.location.href = '/home/categories'
  }
  render() {
    return (
      <>
      <Description/>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            this.goBack()
          }}
          subTitle="商品分类管理/新增分类"
          style={{ paddingLeft: 10 }}
        />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="分类名称"
            name="category"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
              <Button type='primary' danger >取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    )
  }
}
