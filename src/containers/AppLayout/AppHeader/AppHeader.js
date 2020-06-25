import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
  LogoutOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { regions as REGIONS } from 'localization';
import { localizationHelper, browserHistory } from 'helpers';
import { t } from 'helpers/i18n';

const { Header } = Layout;
const { getCurrentLanguage, changeLanguage } = localizationHelper;

const AppHeader = () => {
  // cũng thế
  const currentUser = {
    name: 'quangdv',
    picture: '',
  };

  const logout = () => {
    browserHistory.push('/login');
  };

  const localizationMenu = (
    <Menu>
      {Object.values(REGIONS).map(el => (
        <Menu.Item key={el.key} onClick={() => changeLanguage(el.key)}>
          <Avatar src={el.flag} shape="square" />
          <span style={{ marginLeft: 10 }}>{el.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item onClick={logout}>
        <LogoutOutlined />
        <span>{t('Logout')}</span>
      </Menu.Item>
    </Menu>
  );

  const currentRegion = REGIONS[getCurrentLanguage()];

  return (
    <Header className="app-header">
      <Dropdown overlay={localizationMenu} trigger={['click']}>
        <span className="app-user">
          <Avatar src={currentRegion.flag} shape="square" />
          <span className="name">{currentRegion && currentRegion.name}</span>
        </span>
      </Dropdown>

      <Dropdown overlay={userMenu} trigger={['click']}>
        <span className="app-user">
          <Avatar src={currentUser.picture} />
          <span className="name">{currentUser.name}</span>
          <DownOutlined />
        </span>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
