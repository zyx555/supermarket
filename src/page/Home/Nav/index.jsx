import React, { Component } from 'react'
import {
    AppstoreOutlined, ContainerOutlined, DesktopOutlined, MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

// import { getActiveElement } from '@testing-library/user-event/dist/utils';

// function getItem(label, key, icon, children, type) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//         type,
//     };
// }
const { SubMenu } = Menu
const items = [
    { title: '数据概况', key: '1', icon: <PieChartOutlined />, path: '' },
    { title: '用户信息管理', key: '2', icon: <DesktopOutlined />, path: '/home/users' },
    { title: '商品信息管理', key: '3', icon: <ContainerOutlined />, path: '/home/commodityMessage' },
    { title: '商品分类管理', key: '4', icon: <MailOutlined />, path: '/home/categories' },
    { title: '订单信息管理', key: '5', icon: <AppstoreOutlined />, path: '' },
    { title: '广告投放管理', key: '6', icon: <ContainerOutlined />, path: '/home/ad' },


]


export default class Nav extends Component {
    menuTag = function deep(items) {
        if (items && items.length > 0) {
            return items.map(item => {
                if (item.children && item.children.length > 0) {
                    return (<SubMenu key={item.path} icon={item.icon} title={item.title}>
                        {deep(item.children)}
                    </SubMenu>)
                }
                return (<Menu.Item key={item.path} icon={item.icon}>
                    <Link to={item.path}>{item.title}</Link>
                </Menu.Item>)
            })
        }
    }
    render() {

        return (
            <>
                <div style={{ color: "white", fontSize: "16px", textAlign: "center", margin: "17px" }}>云超市管理系统</div>
                <Menu
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                // inlineCollapsed={collapsed}
                // items={items}
                >{this.menuTag(items)}
                </Menu>
                {/* <Outlet /> */}
            </>
        );
    }



}

