import React, { useState } from 'react';
import { Layout } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  ProjectOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  TeamOutlined,
  FileOutlined,
  BarChartOutlined,
  PlayCircleOutlined,
  ShopOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      onClick: () => navigate('/')
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: '项目管理',
      onClick: () => navigate('/projects')
    },
    {
      key: '/planning',
      icon: <CalendarOutlined />,
      label: '项目规划',
      onClick: () => navigate('/planning')
    },
    {
      key: '/execution',
      icon: <PlayCircleOutlined />,
      label: '执行控制',
      onClick: () => navigate('/execution')
    },
    {
      key: '/tasks',
      icon: <CheckSquareOutlined />,
      label: '任务管理',
      onClick: () => navigate('/tasks')
    },
    {
      key: '/resources',
      icon: <TeamOutlined />,
      label: '资源管理',
      onClick: () => navigate('/resources')
    },
    {
      key: '/suppliers',
      icon: <ShopOutlined />,
      label: '供应商管理',
      onClick: () => navigate('/suppliers')
    },
    {
      key: '/documents',
      icon: <FileOutlined />,
      label: '文档管理',
      onClick: () => navigate('/documents')
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: '报表分析',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 