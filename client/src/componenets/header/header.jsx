import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
const items = [
  {
    label: 'College List',
    key: 'colleges',
    // icon: <MailOutlined />,
  },
  {
    label: 'Student List',
    key: 'students',
    // icon: <AppstoreOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('colleges');
  let navigate = useNavigate();
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(`/${e.key}`);
  };

  return (
    <div className="header">
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['collegeList']}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Header;
