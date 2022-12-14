import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Description from './Description';
import HttpUtil from '../../../Util/httpUtil';
import styles from './index.module.css';
import binaryArrToUrl from '../../../Util/binaryArrToUrl';
import { Card, Col, Row, Image, Button, Form, Input, Dropdown, Menu, Space, Select, message, Popconfirm,Tooltip } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DownOutlined, SmileOutlined, CloseOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';
import useItems from 'antd/lib/menu/hooks/useItems';
import httpUtil from '../../../Util/httpUtil';
const { Option } = Select


export default class CommodityMessage extends Component {

    state = {
        pagination: {
            count: 1,
            pageSize: 8,
            total: 0,
        },
        commodity: {
            category_id: '',
            commodityName: '',
            inventoryStatus: '',
            popularity: '',
            _id: ''
        },
        data: [],
        loading: true,
        isEdit: false,
        category:[]
    }
    popularMenu = [
        {
            key: 4,
            value: '๐X4'
        },
        {
            key: 3,
            value: '๐X3'
        },
        {
            key: 2,
            value: '๐X2'
        },
        {
            key: 1,
            value: '๐X1'
        },

    ]
    // categoryMenu = [
    //     {
    //         key: '5',
    //         value: 'ไปฃ้คๅ'

    //     },
    //     {
    //         key: '6',
    //         value: 'ไผ้ฒ้ถ้ฃ'
    //     },
    //     {
    //         key: '7',
    //         value: 'ๆฅ็จๅ'
    //     },
    //     {
    //         key: '8',
    //         value: '้ฅฎๅ'
    //     },
    //     {
    //         key: '9',
    //         value: 'ๆฐดๆ'
    //     },
    // ]
    inventoryMenu = [
        {
            key: 1,
            value: 'ๅ่ถณ'
        },
        {
            key: 0,
            value: '้่กฅ่ดง'
        },
    ]

    getCommodities = () => {
        const { pageSize, count } = this.state.pagination
        const { category_id, commodityName, inventoryStatus, popularity } = this.state.commodity
        HttpUtil.getCommodities({
            count,
            pageSize,
            category_id,
            commodityName,
            inventoryStatus,
            popularity,
        }).then((res) => {
            // console.log(res.data.data)
            const { data, total } = res.data
            const { pagination } = this.state
            pagination.total = total
            this.setState({
                pagination,
                commodity: data,
                loading: false,

            })
            console.log(this.state.pagination, this.state.commodity)
        })
    }
    componentDidMount = () => {
        this.getCommodities()
        const { count, pageSize } = this.state.pagination
        HttpUtil.getCategories({
            current:count,
            pageSize
        }).then((res) => {
            console.log(res.data.data)
            this.setState({
                category: res.data.data
            })
            console.log(this.state.category)
        })
    }
    loadMoreData = () => {
        const { count, pageSize } = this.state.pagination
        const { category_id, commodityName, inventoryStatus, popularity } = this.state.commodity
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: true
        })
        HttpUtil.getCommodities({
            count: count + 1,
            pageSize,
            category_id: '',
            commodityName: '',
            inventoryStatus: '',
            popularity: ''
        })
            .then((res) => {
                // console.log(res)
                // const arrCommodity = Array.from(this.state.commodity)
                // console.log(arrCommodity)
                // const newCommodity = arrCommodity.concat(res.data.data)
                this.setState({
                    count,
                    //   commodity: newCommodity,
                    commodity: [...this.state.commodity, ...res.data.data],
                    loading: false
                })
                // console.log(typeof(this.state.commodity)) 
            })
            //   .then((body) => {
            //     console.log(body)

            //   })
            .catch(() => {
                this.setState({
                    loading: false
                })
            });
    };

    onFinish = (values) => {
       console.log(values)
       const { pageSize, count } = this.state.pagination
    //    if(values.popularity=='ๅ่ถณ'){
    //     const popularity =1
    //    }else{
    //     const popularity =0
    //    }
       httpUtil.getCommodities({
        count,
        pageSize,
        category_id:values.category_id,
        commodityName:values.commodityName,
        inventoryStatus:values.inventoryStatus,
        popularity:values.popularity,
       }).then((res)=>{
        const { data, total } = res.data
        const { pagination } = this.state
        pagination.total = total
            this.setState({
                pagination,
                commodity: data,
                loading: false
            })
            message.success("ๆ็ดขๆๅ")
       })
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    changeEdit = () => {
        this.setState({
            isEdit: true
        })
    }

    updateCommodity = () => {
        const oneValue = document.getElementById('inputOne')
        const twoValue = document.getElementById('inputTwo')
        const threeValue = document.getElementById('inputThree')
        const fourValue = document.getElementById('inputFour')
        const fiveValue = document.getElementById('inputFive')

        const [currentPrice, inventory, danger_inventory, cost, sellingUnit] = [Number(oneValue.value), Number(twoValue.value), Number(threeValue.value), Number(fourValue.value), fiveValue.value]
        const newCommodity = { currentPrice, inventory, danger_inventory, cost, sellingUnit }
        const oldCommodity = this.state.commodity
        HttpUtil.updateCommodity({
            _id: oneValue.name,
            currentPrice,
            inventory,
            danger_inventory,
            cost,
            sellingUnit

        }).then(() => {
            this.setState({
                commodity: [...oldCommodity, ...Array.from(newCommodity)],
                isEdit: false,
                loading: false
            })
            const { pageSize, count } = this.state.pagination
            HttpUtil.getCommodities({
                count,
                pageSize,
                category_id: '',
                commodityName: '',
                inventoryStatus: '',
                popularity: ''
            }).then((res) => {
                message.success('ไฟฎๆนๅๅไฟกๆฏๆๅ')
                this.setState({
                    count,
                    commodity: [...res.data.data],
                    loading: false
                })
                console.log(this.state.commodity)

            })
        })
    }
    deleteCommodity = (_id, category_id) => {
        const { commodity } = this.state
        const curTotal = commodity.length
        HttpUtil.deleteCommodities({
            _id,
            curTotal,
            category_id
        }).then((res) => {
            const { pageSize, count } = this.state.pagination
            HttpUtil.getCommodities({
                count,
                pageSize,
                category_id: '',
                commodityName: '',
                inventoryStatus: '',
                popularity: ''
            }).then((res) => {
                message.success('ๅ?้คๅๅๆๅ')
                this.setState({
                    count,
                    commodity: [...res.data.data],
                    loading: false
                })
                console.log(this.state.commodity)

            })
        })
    }

    render() {
        const commodity = Array.from(this.state.commodity)
        const { total } = this.state.pagination
        const isEdit = this.state.isEdit
        return (
            <>
                <Description />
                <div className={'update'}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="็ซ็็จๅบฆ"
                            name="popularity"
                        >
                            <Select className="select-before">
                                {
                                    this.popularMenu.map((item, index) => {
                                        return (<Option value={item.key} >{item.value}</Option>)
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="ๅๅๅ็งฐ"
                            name="commodityName"
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="ๅๅๅ็ฑป"
                            name="category_id"
                        >
                            <Select className="select-before">
                            {
                                this.state.category.map((item) => {
                                    return (
                                        <Option value={item._id} >{item.categoryName}</Option>
                                    )
                                })
                            }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="ๅบๅญ็ถๆ"
                            name="inventoryStatus"
                        >
                            <Select className="select-before">
                                {
                                    this.inventoryMenu.map((item, index) => {

                                        return (
                                            <Option value={item.key} >{item.value}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            
                               <div className={styles.search}> 
                                <Button type="primary" htmlType="submit" shape="circle"  className={styles.searchButton} icon={<SearchOutlined />} />
                                </div>
                            
                           <div className={styles.add}>
                             <Link to='/home/commodityMessage/addCommodity'>
                                <Button type="primary" htmlType="submit">
                                    ๆทปๅ?ๅๅ
                                </Button>
                            </Link>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
                <div className={styles.out}>
                    <div className='wall'>
                        <InfiniteScroll
                            dataLength={commodity.length}
                            next={this.loadMoreData}
                            hasMore={commodity.length < total}
                            scrollableTarget="scrollableDiv"
                        >

                            {commodity.map((item) => {
                                const url = binaryArrToUrl(item.file, item.picMimetype)
                                return (
                                    <div className="site-card-wrapper" key={item._id}>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Card
                                                    title={<Image preview={false} width={100} src={url} />}
                                                    bordered={false}
                                                    loading={this.state.loading}
                                                    actions={[
                                                        isEdit
                                                            ?
                                                            <Button size='small' type='primary' htmlType="submit" onClick={this.updateCommodity} >
                                                                ็กฎๅฎ
                                                            </Button>
                                                            :
                                                            <div className={styles.bottom}>
                                                                <span>  <EditOutlined onClick={this.changeEdit} /></span>
                                                                <Popconfirm
                                                                    title="็กฎๅฎๅ?้ค่ฏฅๅๅๅ๏ผ"
                                                                    onConfirm={this.deleteCommodity.bind(item, item._id, item.category_id)}
                                                                    okText="็กฎ่ฎค"
                                                                    cancelText="ๅๆถ"
                                                                >
                                                                    <span> <CloseOutlined /></span>
                                                                </Popconfirm>
                                                            </div>
                                                    ]

                                                    }
                                                >
                                                    <div className={styles.detail}>

                                                        <p className={styles.commodityName}>{item.commodityName}</p>
                                                        {
                                                            isEdit
                                                                ?
                                                                <>
                                                                    <div className={styles.updateCommodityLeft}>
                                                                        <div>็ซ็๏ผ{'๐'.repeat(item.popularity)}</div>
                                                                        <div>็ฐไปท๏ผ<Input type="text" id='inputOne' name={item._id} defaultValue={item.currentPrice}></Input></div>
                                                                        <div> ๅบๅญ๏ผ<Input type="text" id='inputTwo' defaultValue={item.inventory} ></Input></div>
                                                                        <div> ่ญฆๆๅบๅญ๏ผ<Input type="text" id='inputThree' defaultValue={item.danger_inventory} ></Input></div>

                                                                    </div>
                                                                    <div className={styles.updateCommodityRight}>
                                                                        <div>ๅ็ฑป๏ผ{item.category.categoryName}</div>
                                                                        <div>ๆๆฌ๏ผ<Input type="text" id='inputFour' defaultValue={item.cost} ></Input></div>
                                                                        <div>้้๏ผ{item.salesVolume}{item.sellingUnit}</div>
                                                                        <div>ๅฎๅๅไฝ๏ผ<Input type="text" id='inputFive' defaultValue={item.sellingUnit} ></Input></div>

                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    <div className={styles.detailLeft}>
                                                                        <div>็ซ็๏ผ{'๐'.repeat(item.popularity)}</div>
                                                                        <div>็ฐไปท๏ผ{item.currentPrice}</div>
                                                                        <div>ๅบๅญ๏ผ{item.inventory}</div>
                                                                        <div>่ญฆๆๅบๅญ๏ผ{item.danger_inventory}</div>

                                                                    </div>

                                                                    <div className={styles.detailRight}>
                                                                        <div>ๅ็ฑป๏ผ{item.category.categoryName}</div>
                                                                        <div>ๆๆฌ๏ผ{item.cost}</div>
                                                                        <div>้้๏ผ{item.salesVolume}{item.sellingUnit}</div>
                                                                        <div>ๅฎๅๅไฝ๏ผ{item.sellingUnit}</div>
                                                                    </div>
                                                                </>

                                                        }
                                                    </div>

                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                )
                            })
                            }


                        </InfiniteScroll>
                    </div>
                </div>
            </>
        )
    }
}
