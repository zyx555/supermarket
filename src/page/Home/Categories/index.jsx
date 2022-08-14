import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Avatar, List, Button, message, Upload, Input, Divider, Skeleton } from 'antd';
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
    loading: false,
  }
  componentDidMount() {
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
        pagination
      })
      console.log(data.length)
    })
  }
  handleDelete = (id) => {
    const { data } = this.state
    const curTotal = data.length
    HttpUtil.deleteCategory({
      _id: id,
      curTotal: curTotal
    }).then((res) => {
      console.log(res)
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
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
              // active
              />
            }
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
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
                  <Button type="primary" danger key={this._id} onClick={this.handleDelete.bind(data, data._id)}>删除分类</Button>
                </List.Item>)
              }
              pagination={false} />
          </InfiniteScroll>
        </div>
      </>
    )
  }
}