import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom'
import Nav from './Nav'
import 'antd/dist/antd.min.css'

const { Header, Content,  Sider } = Layout;

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 50, }
}
const tailLayout = {
    wrapperCol: { offset: 0, span: 10 },
}
const Home = () => {

    return (
        // const { id, pageSize } = [props.id, props.pageSize].map(string)

        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                {/* <div className="logo" /> */}
                <Nav />
            </Sider>

            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 624 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>

        </Layout>
    );


}
export default Home

