import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { AppstoreOutlined, ExportOutlined, LogoutOutlined, PictureOutlined } from "@ant-design/icons";
import { useSession } from "./session";

const { Sider, Header, Content } = Layout;

export default function AdminLayout() {
  const { email, logout } = useSession();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const selected = location.pathname.startsWith("/admin/gallery") ? "gallery" : "listings";

  return (
    <Layout className="uh-admin">
      <Sider breakpoint="lg" collapsedWidth={0} collapsed={collapsed} onCollapse={setCollapsed} width={232}>
        <Link to="/admin/listings" className="uh-admin__brand">
          <img src="/Logo1.png" alt="Urban Hive" />
          <span>Admin</span>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selected]}
          items={[
            { key: "listings", icon: <AppstoreOutlined />, label: <Link to="/admin/listings">Listings</Link> },
            { key: "gallery", icon: <PictureOutlined />, label: <Link to="/admin/gallery">Home carousel</Link> },
            {
              key: "site",
              icon: <ExportOutlined />,
              label: (
                <a href="/" target="_blank" rel="noopener noreferrer">
                  View website
                </a>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="uh-admin__header">
          <span className="uh-admin__user">{email}</span>
          <Button icon={<LogoutOutlined />} onClick={logout}>
            Sign out
          </Button>
        </Header>
        <Content className="uh-admin__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
