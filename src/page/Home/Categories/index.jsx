import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { List, Button, Divider, Skeleton, Popconfirm, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Description from './Description'
import HttpUtil from '../../../Util/httpUtil'

export default class index extends Component {
  state = {
    pagination: {
      current: 1,
      pageSize: 5,
      total: 0,
    },
    data: [],
    loading: true,
  }
 getCategories=()=> {
    const { pageSize, current } = this.state.pagination
    HttpUtil.getCategories({
      current,
      pageSize
    }
    ).then((res) => {
      const { data, total } = res.data
      const { pagination } = this.state
      pagination.total = total
      this.setState({
        data: data,
        loading: false,
        pagination
      })
    })
  }
  componentDidMount(){
    this.getCategories()
  }
  handleDelete = (id) => {
    const { data } = this.state
    const curTotal = data.length
    
      HttpUtil.deleteCategory({
        _id: id,
        curTotal: curTotal
      }).then(() => {
        message.success('删除成功')
        this.getCategories()
      })
  }
  loadMoreData = () => {
    const { current, pageSize } = this.state.pagination
    if (this.state.loading) {
      return;
    }
    this.setState({
      loading: true
    })
    HttpUtil.getCategories({
      current,
      pageSize
    })
      .then((res) => res.json())
      .then((body) => {
        this.setState({
          data: [...this.state.data, ...body.results]
        })
        this.setState({
          loading: false
        })
      })
      .catch(() => {
        this.setState({
          loading: false
        })
      });
  };

  render() {
    const { data } = this.state
    return (
      <>
        <Description />
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={this.loadMoreData}
            hasMore={data.length < 50}
            // loader={
            //   <Skeleton
            //     avatar
            //     paragraph={{
            //       rows: 1,
            //     }}
            //   />
            // }
            // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              loading={this.state.loading}
              itemLayout="horizontal"
              header={
                <Link to='/home/categories/addcategory' > <Button type='primary' onClick={this.handleAdd} >新增分类</Button></Link>

              }
              dataSource={data}
              renderItem={(data) => (
                <List.Item key={data._id}>
                  <List.Item.Meta
                    title={`${data.categoryName}类`}
                    description={`共计${data.total}件商品`}
                  />
                  <Popconfirm
                    title="确定删除该分类吗？"
                    onConfirm={this.handleDelete.bind(data, data._id)}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button type="primary" danger key={this._id} >删除分类</Button>
                  </Popconfirm>

                </List.Item>)
              }
              pagination={false} />
          </InfiniteScroll>
        </div>
      </>
    )
  }
}