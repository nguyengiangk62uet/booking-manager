/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { browserHistory } from 'helpers';
import { useWindowDimensions } from 'hooks/common';

const { Sider, Footer } = Layout;
const { SubMenu } = Menu;

let autoCollapse = true;

const AppSider = props => {
  // Get selectedKey, openKey from route & pathname
  const { filteredNavigation } = props;
  const { location } = browserHistory;
  const getParentKey = selectedKey => {
    return filteredNavigation.find(
      item => item.children && item.children.includes(selectedKey),
    );
  };
  let selectedKey = location.pathname;
  let parentKey = getParentKey(selectedKey);
  if (!parentKey) {
    selectedKey = `/${selectedKey.split('/')[1]}`;
    parentKey = getParentKey(selectedKey);
  }
  const openKey = parentKey ? parentKey.path : '/';

  const logoUrl = '';
  const [collapsed, setCollapsed] = useState(false);
  const { width } = useWindowDimensions();

  const toggle = () => {
    setCollapsed(prev => !prev);
  };

  useEffect(() => {
    if (autoCollapse) {
      setCollapsed(width <= 768);
    }
  }, [width]);

  return (
    <Sider
      className={`app-sider${collapsed ? ' collapsed' : ''}`}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
    >
      {collapsed ? (
        <MenuUnfoldOutlined className="app-icon app-trigger" onClick={toggle} />
      ) : (
          <MenuFoldOutlined className="app-icon app-trigger" onClick={toggle} />
        )
      }

      {logoUrl && (
        <div className="app-logo">
          <Link to="/">
            <img src={logoUrl} alt="logo" />
          </Link>
        </div>
      )}

      <Menu
        className="app-menu"
        theme="dark"
        mode="inline"
        defaultOpenKeys={[openKey]}
        selectedKeys={[selectedKey]}
      >
        {filteredNavigation.map(item => {
          if (!item.icon) return null;
          if (!item.children) {
            return (
              <Menu.Item key={item.path}>
                <Link to={item.path}>
                  <item.icon className="app-icon" />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            );
          }
          const { children } = item;
          const childs = filteredNavigation.filter(
            child => children.includes(child.path) && !child.children,
          );
          return (
            <SubMenu
              key={item.path}
              title={
                <span>
                  <item.icon className="app-icon" />
                  <span>{item.name}</span>
                </span>
              }
            >
              {childs.map(child => {
                return (
                  <Menu.Item key={child.path}>
                    <Link to={child.path}>{child.name}</Link>
                  </Menu.Item>
                );
              })}
            </SubMenu>
          );
        })}
      </Menu>

      {!collapsed && (
        <Footer className="app-footer">
          React Sample © {process.env.REACT_APP_VERSION}
        </Footer>
      )}
    </Sider>
  );
};

export default AppSider;
