import React, { useEffect, useState } from "react";

import "./estiloMenu.css";
import { Link, useHistory, Switch } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";

import { Button, Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { getMe, logout } from "../Utils/Login";

import AlunosMain from "../pages/Alunos/AlunosMain";
import DisciplinasMain from "../pages/Disciplinas/DisciplinasMain";
import ProfessoresMain from "../pages/Professores/ProfessoresMain";
import TurmasMain from "../pages/Turmas/TurmasMain";
import HorariosMain from "../pages/Horarios/HorariosMain";
import Home from "../pages/Home";

import { cookies } from "../pages/Login/Login";
import SubMenu from "antd/lib/menu/SubMenu";
import Page404 from "../pages/Page404";

const { Header, Content, Footer, Sider } = Layout;

function ManagerMenu() {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const history = useHistory();
  useEffect(() => {
    getMe()
      .then((data) => {
        setNomeUsuario(data.cod_login);
        switch (data.cod_perfil) {
          case "Usuário":
            history.push("/home");
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
          <p>Olá {nomeUsuario}</p>
        </Header>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          {/* AQUI LIGAMOS BOTÕES AS PAGES*/}
          <Menu.Item key="0" icon={<BorderlessTableOutlined />}>
            <Link to={`/gerente/home`} />
            Home
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />} href="/alunos">
            <Link to={`/gerente/alunos`} />
            Alunos
          </Menu.Item>
          <SubMenu key="subLeciona" title="Ensino" icon={<FormOutlined />}>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
              href="/disciplinas"
            >
              <Link to={`/gerente/disciplinas`} />
              Disciplinas
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to={`/gerente/professores`} />
              Professores
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to={`/gerente/turmas`} />
            Turmas
          </Menu.Item>
          <Menu.Item key="5" icon={<FieldTimeOutlined />}>
            <Link to={`/gerente/horarios`} />
            Horários
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
            <Route path={`/gerente/home`}>
              <Home />
            </Route>
            <Route path={`/gerente/alunos`}>
              <AlunosMain />
            </Route>
            <Route path={`/gerente/disciplinas`}>
              <DisciplinasMain />
            </Route>
            <Route path={`/gerente/professores`}>
              <ProfessoresMain />
            </Route>
            <Route path={`/gerente/turmas`}>
              <TurmasMain />
            </Route>
            <Route path={`/gerente/horarios`}>
              <HorariosMain />
            </Route>
            <Route>
              <Page404 />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Criado por Guilherme Matos de Oliveira, Lucas Querneu e Domingos
          Gomes.
          <br />
          Utilizado Ant Design ©2018 Created by Ant UED.
        </Footer>
      </Layout>
    </Layout>
  );
}

export default ManagerMenu;
