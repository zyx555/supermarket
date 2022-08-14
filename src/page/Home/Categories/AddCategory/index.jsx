import React, { Component } from 'react'
import { Button, Form, Input } from 'antd';
import HttpUtil from '../../../../Util/httpUtil'

export default class AddCategory extends Component {
  state = {
    curTotal: '5',
    // category: ''
  }


  onFinish = (values) => {
    const { curTotal } = this.state

    HttpUtil.addCategory({
      categoryName: values.category,
      curTotal: curTotal
    }).then((res) => {
      console.log(res)
      // this.setState({
      //   curTotal: curTotal
      // })
    }
    )
  }
  onFinishFailed = (err) => {
console.log(err)
  }
  render() {
    return (
      <>
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
            <Button type="primary" htmlType="submit">
              确定
            </Button>
            <Button type='primary' danger >取消</Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
