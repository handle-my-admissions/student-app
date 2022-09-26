/**
 * renders out SideBar for the Application.
 * Being utilized by Profile & outermost layout (`main.js`)
 * @param data -data to be rendered (the content === link to other components)
 * @param haveSubMenu - boolean value , to notify that the caller component need submenu or not.
 * @param isCollapsible - boolean value, is sidebar need to have collapse button & mechanism
 *
 * Written By : Tejas Ladhani
 */

import React, { useContext, useState } from 'react';
import { NotificationOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import './style.css';
import { UserContext } from '../../contexts/user';

const { Sider } = Layout;
const { SubMenu } = Menu;

type appSiderPropType = {
  data: {title:string, linkTo:string, icon: React.ReactNode}[],
  haveSubMenu?:boolean,
  isCollapsible?:boolean,
}
function AppSider({ data, haveSubMenu, isCollapsible }:appSiderPropType) {
  const [collapsed, setCollapsed] = useState(false);
  const {user} = useContext(UserContext);
  let keyCounter = 1;
  const onCollapse = (collapseState:boolean) => {
    setCollapsed(collapseState);
  };

  if(user == undefined){
    return <></>;
  }
  
  return (
    <Sider
      width={210}
      className="site-layout-background"
      collapsible={isCollapsible}
      collapsed={collapsed}
      onCollapse={() => onCollapse(!collapsed)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        {haveSubMenu === true ? (
          <SubMenu
            key="sub3"
            icon={<NotificationOutlined />}
            title="Notifications"
          >
            <Menu.Item key="9">New in Queries !</Menu.Item>
            <Menu.Item key="10">Application Generated !</Menu.Item>
            <Menu.Item key="11">No. Of Students Increasing !</Menu.Item>
            <Menu.Item key="12">Notice Generated !</Menu.Item>
          </SubMenu>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        )}

        {data.map((item) => (
          <Menu.Item key={keyCounter++} icon={item.icon}>
            <span>{item.title}</span>
            <Link to={item.linkTo} />
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default AppSider;
