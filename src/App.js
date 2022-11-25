import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Row, Col, Card, Alert } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Документация", "1", <PieChartOutlined />),
  getItem("Настройки", "2", <DesktopOutlined />),
  getItem("Пользователь", "sub1", <UserOutlined />, [
    getItem("Джон", "3"),
    getItem("Николай", "4"),
    getItem("Яна", "5"),
  ]),
  getItem("Команда", "sub2", <TeamOutlined />, [
    getItem("Разработчики", "6"),
    getItem("Менеджеры", "8"),
  ]),
  getItem("Файлы", "9", <FileOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: "Сделать",
      items: [
        { id: 1, title: "Пойти в магазин" },
        { id: 2, title: "Выкинуть мусор" },
        { id: 3, title: "Покушать" },
      ],
    },
    {
      id: 2,
      title: "Рефакторинг",
      items: [
        { id: 4, title: "Поработать" },
        { id: 5, title: "Погулять" },
        { id: 6, title: "Поспать" },
      ],
    },
    {
      id: 3,
      title: "Встреча",
      items: [
        { id: 7, title: "Реакт" },
        { id: 8, title: "Изучить Redux " },
        { id: 9, title: "JS" },
      ],
    },
  ]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Пользователь</Breadcrumb.Item>
            <Breadcrumb.Item>Николай</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Row gutter={56}>
              {boards.map((board) => (
                <Col span={700}>
                  <Card title={board.title}>
                    {board.items.map((item) => (
                      <Alert
                        style={{
                          margin: "5px",
                          cursor: "grab",
                        }}
                        message={item.title}
                      >
                        {item.title}
                      </Alert>
                    ))}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          nikolay_saitov ©2022 with AntD
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
