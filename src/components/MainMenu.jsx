import React, { useEffect, useState } from "react";

import "./estiloMenu.css";
import { Link, useHistory, Switch } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";

import { Avatar, Button, Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  UserSwitchOutlined,
  FormOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { getMe, logout } from "../Utils/Login";

import AlunosMain from "../pages/Alunos/AlunosMain";
import DisciplinasMain from "../pages/Disciplinas/DisciplinasMain";
import ProfessoresMain from "../pages/Professores/ProfessoresMain";
import TurmasMain from "../pages/Turmas/TurmasMain";
import HorariosMain from "../pages/Horarios/HorariosMain";
import Home from "../pages/Home";

import { cookies } from "../pages/Login/Login";
import UsuariosMain from "../pages/Usuarios/UsuariosMain";
import SubMenu from "antd/lib/menu/SubMenu";
import TipoEnsinoMain from "../pages/TipoEnsino/TipoEnsinoMain";
import LecionaMain from "../pages/Leciona/LecionaMain";
import Page404 from "../pages/Page404";
import TurnoMain from "../pages/Turno/TurnoMain";
import AulasMain from "../pages/Aulas/AulasMain";

const { Header, Content, Footer, Sider } = Layout;

function MainMenu() {
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
          case "Gerente":
            history.push("/gerente");
            break;
          default:
            console.log("");
        }
      })
      .catch((err) => {
        history.push("/");
      });
  }, []);

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
        collapsedWidth="36"
      >
        <div className="logo" />
        <Header
          className="site-layout-sub-header-background"
          style={{ paddingLeft: "5%" }}
        >
          <Avatar size={32}>{nomeUsuario}</Avatar>
        </Header>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          {/* AQUI LIGAMOS BOTÕES AS PAGES*/}
          <Menu.Item key="0" icon={<BorderlessTableOutlined />}>
            <Link to={`/main/home`} />
            Home
          </Menu.Item>

          <SubMenu key="subLeciona" title="Ensino" icon={<FormOutlined />}>
            <Menu.Item
              key="2"
              icon={<VideoCameraOutlined />}
              href="/disciplinas"
            >
              <Link to={`/main/disciplinas`} />
              Disciplinas
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to={`/main/professores`} />
              Professores
            </Menu.Item>
            <Menu.Item key="4" icon={<BellOutlined />}>
              <Link to={`/main/leciona`} />
              Leciona
            </Menu.Item>
          </SubMenu>
          <SubMenu key="subTurmas" title="Turmas" icon={<FormOutlined />}>
            <Menu.Item key="6" icon={<TeamOutlined />}>
              <Link to={`/main/tipo_ensino`} />
              Tipo de Ensino
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              <Link to={`/main/turnos`} />
              Turnos
            </Menu.Item>
            <Menu.Item key="5" icon={<TeamOutlined />}>
              <Link to={`/main/turmas`} />
              Turmas
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="1" icon={<UserOutlined />} href="/alunos">
            <Link to={`/main/alunos`} />
            Alunos
          </Menu.Item>

          <Menu.Item key="8" icon={<FieldTimeOutlined />}>
            <Link to={`/main/horarios`} />
            Horários
          </Menu.Item>
          <Menu.Item key="9" icon={<UserSwitchOutlined />}>
            <Link to={`/main/aulas`} />
            Aulas
          </Menu.Item>
          <Menu.Item key="10" icon={<UserSwitchOutlined />}>
            <Link to={`/main/usuarios`} />
            Gerenciar Usuários
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
            <Route path={`/main/leciona`}>
              <LecionaMain />
            </Route>
            <Route path={`/main/turmas`}>
              <TurmasMain />
            </Route>
            <Route path={`/main/tipo_ensino`}>
              <TipoEnsinoMain />
            </Route>
            <Route path={`/main/turnos`}>
              <TurnoMain />
            </Route>
            <Route path={`/main/horarios`}>
              <HorariosMain />
            </Route>
            <Route path={`/main/usuarios`}>
              <UsuariosMain />
            </Route>
            <Route path={`/main/aulas`}>
              <AulasMain />
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

export default MainMenu;
