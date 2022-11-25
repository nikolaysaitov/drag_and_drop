import "./App.css";
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined, EllipsisOutlined, SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Row, Col, Card, Alert, Button } from "antd";
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

  const [currentBoard, setCurrenBoard] = useState(null)
  const [currentItem, setCurrenItem] = useState(null)

  function dragOverHandler(e) {
    e.preventDefault(e);
    if (e.target.className == "item") {
      e.target.style.boxShadow = "0 4px 3px grey"
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = "none"
  }

  function dragStartHandler(e, board, item) {
    setCurrenBoard(board);
    setCurrenItem(item);
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = "none"
  }

  function dropHandler(e, board, item) {
    e.preventDefault(e);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    setBoards(boards.map(b => {
      if(b.id === board.id) {
          return board;
      }
      if(b.id === currentBoard.id) {
        return currentBoard;
      }
    
      return b
    }))
  }


  function dropCardHandler(e, board) {
    if(e.target.className !== "item") { 
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    setBoards(boards.map(b => {
      if(b.id === board.id) {
          return board;
      }
      if(b.id === currentBoard.id) {
        return currentBoard;
      }
      
      return b
    }))
  }
  }

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
                  <Card title={board.title} 
                  onDragOver={(e) => dragOverHandler(e)}
                  onDrop={(e) => dropCardHandler(e, board)}
                  actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]} style={{
                        display: 'flex',
                        
                        width: "350px",
                        minHeight: "600px",
                        flexDirection: 'column',
    justifyContent: 'space-between',
                        
                      }}>
                    {board.items.map((item) => (
                      <div block 

                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={e => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, board, item)}
                      draggable={true}
                        style={{
                          margin: "5px",
                          cursor: "grab",
                        }}
                        message={item.title}   className='item'
                      >
                        {item.title}
                      </div>
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
