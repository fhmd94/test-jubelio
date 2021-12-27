
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

function AppLayout() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Layout.Header style={{ background: '#fff' }}>
        <Menu mode='horizontal' onClick={() => {navigate('/product')}}>
          <Menu.Item key="product"> Create Product</Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: '20px 30px' }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default AppLayout;