import React, { Component } from 'react';
import { Space, Table, Button, Modal, Input, message, Popconfirm } from 'antd';
import HttpUtil from '../../../Util/httpUtil'
import Description from './Description';

export default class Users extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pagination: {
        current: 1,
        pageSize: 6,
        total: 0
      },
      data: [],
      loading: true,
      status: 0,
      isModalVisible: false,
      dangerUser: null,
      canDelete: false,

    }
  }
  handelUpdate = (id) => {
    window.location.href = `/home/updatepsw/${id}`
  }

  inputOnChange = (e) => {
    const inputValue = e.target.value
    const dangerName = this.state.dangerUser.name
    if (inputValue === dangerName) {
      this.setState({
        canDelete: true,
      })
    } else {
      this.setState({
        canDelete: false,
      })
    }
  }

  showModal = (data) => {
    console.log(data)
    this.setState({
      isModalVisible: true,
      dangerUser: data,
    })
  }

  cancelModel = () => {
    this.setState({
      isModalVisible: false,
    })
  }

  confirm(_id) {
    HttpUtil.deleteUser({ _id }).then((res) => {
      message.success('删除成功')
      const { pagination } = this.state
      this.getUsers({ pagination })
      this.cancelModel()
    })
  }

  onTableChange = (paginationState) => {
    console.log(paginationState);
    const { current, pageSize } = paginationState
    const { pagination } = this.state
    pagination.current = current
    pagination.pageSize = pageSize
    this.setState({
      pagination
    })
    this.getUsers()
  }
  getUsers = () => {
    const { current, pageSize } = this.state.pagination
    HttpUtil.getUsers({
      current,
      pageSize
    }).then((res) => {
      console.log(res.data)
      const { users, total } = res.data
      const { pagination } = this.state
      pagination.total = total
      this.setState({
        data: users,
        loading: false,
        pagination
      })
    })
  }
  componentDidMount() {
    this.getUsers()

  }
  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '账号',
      key: 'useraccount',
      dataIndex: 'useraccount',
    },
    {
      title: '密码',
      key: 'userpwd',
      dataIndex: 'userpwd',
    },
    {
      title: '操作',
      key: 'action',
      render: (data) => {
        return (
          <>
            <Space>
              <Button type="primary" onClick={this.handelUpdate.bind(data, data._id)}>更改密码</Button>
              <Button type="primary" danger onClick={this.showModal.bind(data, data)}>删除用户</Button>
            </Space>
          </>
        )
      }
    },
  ]
  render() {
    const { data, pagination, loading } = this.state
    console.log(data)
    return (
      <>
        <Description />

        <Table columns={this.columns} dataSource={data} pagination={pagination} onChange={this.onTableChange} loading={loading} />
        <Modal
          title="确认删除操作"
          visible={this.state.isModalVisible}
          onOk={this.modalHandleOk}
          onCancel={this.cancelModel}
          footer={null}
          destroyOnClose={true}
        >
          <p>
            请输入<strong>{this.state.dangerUser?.name}</strong>以验证
          </p>
          <Input onChange={this.inputOnChange} style={{ borderRadius: 7 }} />
          <Button
            style={{ marginTop: 15, width: '100%', borderRadius: 7 }}
            danger
            disabled={!this.state.canDelete}
            onClick={this.confirm.bind(this, this.state.dangerUser?._id)}
          >
            确认操作，删除用户
          </Button>
        </Modal>
      </>
    )
  }
}