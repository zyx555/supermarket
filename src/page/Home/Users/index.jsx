import React, { Component } from 'react';
import { Space, Table, Button } from 'antd';
import HttpUtil from '../../../Util/httpUtil'
import Description from './Description/inde';


function handelDelet(id) {
  console.log(id)
  HttpUtil.deleteUser({
    _id: id
  }).then((res) => {
    console.log(res)
    this.componentDidMount()
  })
}
function handelUpdate(id) {
  window.location.href = `/home/updatepsw/${id}`
}

const columns = [
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
    render(data) {
      return (
        <>
          <Space>
            <Button type="primary" onClick={handelUpdate.bind(data, data._id)}>更改密码</Button>

            <Button type="primary" danger onClick={handelDelet.bind(data, data._id)}>删除用户</Button>
          </Space>
        </>
      )
    }
  },
];

export default class Users extends Component {

  state = {
    pagination: {
      current: 1,
      pageSize: 6,
      total: 0
    },
    data: [],
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
    this.componentDidMount()
  }

  componentDidMount() {
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
        pagination
      })
    })
  }

  render() {
    const { data, pagination } = this.state
    console.log(data)
    return (
      <>
      <Description/>
        <Table columns={columns} dataSource={data} pagination={pagination} onChange={this.onTableChange} />
      </>
    )
  }

}


