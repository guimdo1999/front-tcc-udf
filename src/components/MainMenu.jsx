import React from "react";
import "./estilo.css";
import { Link, Switch, Route } from "react-router-dom";

import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { getMe } from "../Utils/Login";

import AlunosMain from "../pages/Alunos/AlunosMain";
import DisciplinasMain from "../pages/Disciplinas/DisciplinasMain";
import ProfessoresMain from "../pages/Professores/ProfessoresMain";
import TurmasMain from "../pages/Turmas/TurmasMain";
import Home from "../pages/Home";
import { cookies } from "../pages/Login/Login";

const { Header, Content, Footer, Sider } = Layout;

function MainMenu() {
  const usuario_logado = getMe().then((data) => {
    //const nome_usuario = data.cod_login;

    console.log(data);
  });

  return (
    <Layout>
      <Sider
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
          <p>Olá </p>
        </Header>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {/* AQUI LIGAMOS BOTÕES AS PAGES*/}
          <Menu.Item key="0" icon={<BorderlessTableOutlined />}>
            <Link to={`/main/home`} />
            Home
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />} href="/alunos">
            <Link to={`/main/alunos`} />
            Alunos
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} href="/disciplinas">
            <Link to={`/main/disciplinas`} />
            Disciplinas
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to={`/main/professores`} />
            Professores
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to={`/main/turmas`} />
            Turmas
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: "24px 16px 0" }}>
          {/* AQUI VÃO AS PAGES E SUAS ROTAS */}
          <Switch>
            <Route path={`/main/home`}>
              <Home />
            </Route>
            <Route path={`/main/alunos`}>
              <AlunosMain />
            </Route>
            <Route path={`/main/disciplinas`}>
              <DisciplinasMain />
            </Route>
            <Route path={`/main/professores`}>
              <ProfessoresMain />
            </Route>
            <Route path={`/main/turmas`}>
              <TurmasMain />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainMenu;
