import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Space, Table, Button, Image, message, Upload, Popconfirm } from 'antd';
import HttpUtil from '../../../Util/httpUtil';
import Description from './Description'
import binaryArrToUrl from '../../../Util/binaryArrToUrl';

export default class Ad extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 6,
      total: 0
    },
    data: [],
    adid: '',
    loading: true
  }

  props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text'
    },
    maxCount: 1
  }

   handleDeletAd=(id)=> {
    HttpUtil.deleteAd({
      _id: id
    }).then((res) => {
      console.log(res)
      HttpUtil.getAds({}).then(() => {
        message.success('删除成功')
       HttpUtil.getAds({}).then((res)=>{
       this.setState({
          data: res.data,
          loading: false
        })
        console.log(res)
       })
      })
    })
  }
  customRequest = (data) => {
    console.log(data)
    let formData = new FormData()
    formData.append('_id', this.state.adid)
    formData.append('file', data.file)

    HttpUtil.updateAd(formData).then((res) => {
      console.log(res)
      let newData = res.data
      let data = this.state.data
      data.forEach(item => {
        if (item._id === this.state.adid) {
          item.file = newData.url
        }
      })
      this.setState({
        data
      })
     
      message.success('更新图片成功')
      this.getAds()
    })
  }

  updateAd = (id) => {
    this.setState({
      adid: id
    })
  
  }

  columns = [
    {
      title: '广告公司',
      dataIndex: 'adCompany',
      key: 'adCompany',
    },
    {
      title: '广告名称',
      dataIndex: 'adName',
      key: 'adName',
    },
    {
      title: '所属分类',
      dataIndex: 'adCategory',
      key: 'adCategory',
    },
    {
      title: '广告图片',
      dataIndex: 'file',
      key: 'file',
      render: (_, ad) => {
        const { picMimetype, file } = ad
        const url = binaryArrToUrl(file, picMimetype)
        return <Image preview={false} width={100} src={url} />
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => {
        return (
          <>
            <Space>
              <Upload
                {...this.props}
                customRequest={this.customRequest}
                showUploadList={false}
              >
                <Button type="primary" onClick={this.updateAd.bind(data, data._id)}>更改图片</Button>
              </Upload>
              <Popconfirm
                title="确定删除该广告吗"
                onConfirm={this.handleDeletAd.bind(data, data._id)}
                okText="确认"
                cancelText="取消"
              >
                <Button type="primary" danger  >删除广告</Button>
              </Popconfirm >
            </Space>
          </>
        )
      }
    },
  ];
  componentDidMount() {
    this.getAds()
  }
  getAds=()=>{
    HttpUtil.getAds({}).then((res) => {
      this.setState({
        data: res.data,
        loading: false
      })

    })
  }
  render() {
    const { loading, data, pagination } = this.state

    return (
      <>
        <Description />
        <Link to='/home/ad/add'><Button type='primary' htmlType="submit" >新增广告</Button></Link>
        <Table columns={this.columns} dataSource={data} pagination={false} loading={loading} />
        <Outlet />
      </>

    )
  }
}
