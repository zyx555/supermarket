import React, { Component } from "react";
import { Button, message, Upload, Form, Input,PageHeader } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import HttpUtil from "../../../../Util/httpUtil";
import Description from '../Description'


const onFinish = (data) => {
  console.log(data)
  if (
    data.adCategory !== ''&&
    data.acName !== ''&&
    data.adCompany !== ''

  ) {
    let formData = new FormData()
    formData.append('file', data.file.file)
    formData.append('adCompany', data.adCompany)
    formData.append('adName', data.adName)
    formData.append('adCategory', data.adCategory)
    HttpUtil.addAd(formData).then((res) => {  
      message.success('新增广告成功')
      window.location.href='/home/ad'
      
    })
  } else {
    message.warning("输入内容不能为空")
  }
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
export default class AddAds extends Component {
  state={
    file:'',
    adid:''
  }
  goBack(){
    window.location.href='/home/ad'
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
          subTitle="广告投放管理/新增广告"
          style={{ paddingLeft: 10 }}
        />
        <Form
          name="basic"
          id="addAdForm"
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
            label="广告公司"
            name="adCompany"
            rules={[
              {
                required: true,
                message: 'Please input your adCompany!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="广告名称"
            name="adName"
            rules={[
              {
                required: true,
                message: 'Please input your adName!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="所属分类"
            name="adCategory"
            rules={[
              {
                required: true,
                message: 'Please input your adCategory!',
              },
            ]}
          >
            < Input />
          </Form.Item>

          <Form.Item
            label="图片地址"
            name="file"

          >
            <Upload
              // {...this.props}
              name="file"
              headers={{ authorization: "authorization-text" }}
              beforeUpload={() => {
                  return false
                }}
              maxCount={1}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              上传图片
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
        
        
      </>
    );
  }
}
