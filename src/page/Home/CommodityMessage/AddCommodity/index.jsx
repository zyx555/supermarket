import React, { Component } from "react";
import { Button, message, Upload, Form, Input, PageHeader, Select, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import HttpUtil from "../../../../Util/httpUtil";
import Description from '../Description';
import styles from './index.module.css'
const { Option } = Select

const onFinish = (data) => {
    console.log(data)
    if (
        data.commodityName !== '' &&
        data.category_id !== '' &&
        data.cost !== '' &&
        data.currentPrice !== '' &&
        data.inventory !== '' &&
        data.danger_inventory !== '' &&
        data.sellingUnit !== ''

    ) {
        let formData = new FormData()
        formData.append('file', data.file.file)
        // formData.append('categoryName', data.categoryName)
        formData.append('commodityName', data.commodityName)
        formData.append('cost',  data.cost)
        formData.append('currentPrice', data.currentPrice)
        formData.append(' inventory', data.inventory)
        formData.append('danger_inventory', data.danger_inventory)
        formData.append('sellingUnit', data.sellingUnit)
        formData.append('category_id', data.category_id)
        console.log(formData)
        console.log(typeof data.cost)
        HttpUtil.addCommodities(
        //     {
        //     file:data.file.file,
        //     commodityName: data.commodityName,
        //     cost: Number(data.cost),
        //     currentPrice: Number(data.currentPrice),
        //     inventory: Number(data.inventory),
        //     danger_inventory: Number(data.danger_inventory),
        //     sellingUnit: data.sellingUnit,
        //     category_id: data.category_id
        // }
        formData
        ).then((res) => {
            message.success('新增商品成功')
            window.location.href = '/home/commodityMessage'

        })
    } else {
        message.warning("输入内容不能为空")
    }
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default class addCommodity extends Component {
    state = {
        file: '',
        category_id: '',
        categoryName: '',
        category: [],
        current: 1,
        pageSize: 5
    }
    componentDidMount = () => {
        const { current, pageSize } = this.state
        HttpUtil.getCategories({
            current,
            pageSize
        }).then((res) => {
            console.log(res.data.data)
            this.setState({
                category: res.data.data
            })
            console.log(this.state.category)
        })
    }
    handleChange = (key) => {
        this.setState({
            category_id:key
        })
        }
    goBack() {
        window.location.href = '/home/commodityMessage'
    }
    render() {
        return (
            <>
                <Description />
                <PageHeader
                    className="site-page-header"
                    onBack={() => {
                        this.goBack()
                    }}
                    subTitle="商品信息管理/新增商品"
                    style={{ paddingLeft: 10 }}
                />
                <Form
                    name="basic"
                    id="addCommodity"
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
                        label="商品名称"
                        name="commodityName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your commodityName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="category_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your categoryName!',
                            },
                        ]}
                    >
                        <Select className="select-before" onChange={this.handleChange}>
                            {
                                this.state.category.map((item) => {
                                    return (
                                        <Option value={item._id} >{item.categoryName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item> <Form.Item
                        label="商品成本"
                        name="cost"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your cost!',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="商品现价"
                        name="currentPrice"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your currentPrice!',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="商品库存"
                        name="inventory"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your inventory!',
                            },
                        ]}
                    >
                        < InputNumber />
                    </Form.Item>

                    <Form.Item
                        label="商品警戒库存"
                        name="danger_inventory"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your danger_inventory!',
                            },
                        ]}
                    >
                        < InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="售卖单位"
                        name="sellingUnit"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sellingUnit!',
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
