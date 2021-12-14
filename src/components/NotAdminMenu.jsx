import React, { useEffect, useState } from "react";

import "./estiloMenu.css";
import { Link, useHistory, Switch } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";

import { Avatar, Button, Layout, Menu } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";
import { getMe, logout } from "../Utils/Login";

import { cookies } from "../pages/Login/Login";
import Page404 from "../pages/Page404";
import HomeUser from "../pages/HomeUser";

const { Header, Content, Footer, Sider } = Layout;

function NotAdminMenu() {
  const history = useHistory();
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    getMe()
      .then((data) => {
        setNomeUsuario(data.cod_login);
        switch (data.cod_perfil) {
          case "Gerente":
            history.push("/gerente");
            break;
          case "Admin":
            history.push("/main/home");
            break;
          default:
            console.log("");
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  }, [history]);

  const Logout = () => {
    logout().then(() => {
      cookies.remove("auth_token");
      history.push("/");
    });
  };

  const haveToken = () => {
    if (!cookies.get("auth_token")) {
      history.push("/");
    }
  };

  return (
    <Layout>
      {haveToken()}
      <Sider
        collapsible
        style={{
          overflow: "auto",
          height: "100vh",
          //position: "fixed",
          left: 0,
        }}
        breakpoint="lg"
        collapsedWidth="30"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Link to={`/gerente/atualizar-senha`}>
            <Avatar size={32}>{nomeUsuario}</Avatar>
          </Link>
        </Header>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {/* AQUI LIGAMOS BOTÕES AS PAGES*/}
          <Menu.Item key="0" icon={<BorderlessTableOutlined />}>
            <Link to={`/home`} />
            Home
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Button
            type="primary"
            danger
            onClick={Logout}
            style={{ float: "right", margin: "15px" }}
          >
            Desconectar
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          {/* AQUI VÃO AS PAGES E SUAS ROTAS */}
          <Switch>
            <Route path={`/home`}>
              <HomeUser />
            </Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
}

export default NotAdminMenu;
