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
import SubMenu from "antd/lib/menu/SubMenu";
import { getMe, logout } from "../Utils/Login";
import { cookies } from "../pages/Login/Login";

import AlunosMain from "../pages/Alunos/AlunosMain";
import DisciplinasMain from "../pages/Disciplinas/DisciplinasMain";
import ProfessoresMain from "../pages/Professores/ProfessoresMain";
import TurmasMain from "../pages/Turmas/TurmasMain";
import HorariosMain from "../pages/Horarios/HorariosMain";
import Home from "../pages/Home";

import UsuariosMain from "../pages/Usuarios/UsuariosMain";
import LecionaMain from "../pages/Leciona/LecionaMain";
import Page404 from "../pages/Page404";
import TurnoMain from "../pages/Turno/TurnoMain";
import AulasMain from "../pages/Aulas/AulasMain";
import AnoMain from "../pages/Ano/AnoMain";
import DiaMain from "../pages/Dia/DiaMain";
import FaseMain from "../pages/Fase/FaseMain";
import SerieMain from "../pages/Serie/SerieMain";
import MateriaMain from "../pages/Materia/MateiraMain";
import MatriculaMain from "../pages/Matricular/MatriculaMain";

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
            break;
        }
      })
      .catch((err) => {
        console.log(err);
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
          <Menu.Item key="home" icon={<BorderlessTableOutlined />}>
            <Link to={`/main/home`} />
            Home
          </Menu.Item>

          <SubMenu key="subLeciona" title="Ensino" icon={<FormOutlined />}>
            <Menu.Item key="disciplinas" icon={<VideoCameraOutlined />}>
              <Link to={`/main/disciplinas`} />
              Disciplinas
            </Menu.Item>
            <Menu.Item key="professores" icon={<UploadOutlined />}>
              <Link to={`/main/professores`} />
              Professores
            </Menu.Item>
            <Menu.Item key="leciona" icon={<BellOutlined />}>
              <Link to={`/main/leciona`} />
              Leciona
            </Menu.Item>
            <Menu.Item key="aulas" icon={<UserSwitchOutlined />}>
              <Link to={`/main/aulas`} />
              Aulas
            </Menu.Item>
          </SubMenu>
          <SubMenu key="subTurmas" title="Turmas" icon={<FormOutlined />}>
            <Menu.Item key="turnos" icon={<TeamOutlined />}>
              <Link to={`/main/turnos`} />
              Turnos
            </Menu.Item>
            <Menu.Item key="turmas" icon={<TeamOutlined />}>
              <Link to={`/main/turmas`} />
              Turmas
            </Menu.Item>
            <Menu.Item key="alunos" icon={<UserOutlined />}>
              <Link to={`/main/alunos`} />
              Alunos
            </Menu.Item>
            <Menu.Item key="serie" icon={<UserOutlined />}>
              <Link to={`/main/serie`} />
              Serie
            </Menu.Item>
          </SubMenu>

          <Menu.Item key="materia" icon={<UserOutlined />} href="/alunos">
            <Link to={`/main/materia`} />
            Matéria
          </Menu.Item>
          <Menu.Item key="horarios" icon={<FieldTimeOutlined />}>
            <Link to={`/main/horarios`} />
            Horários
          </Menu.Item>
          <Menu.Item key="dia" icon={<FieldTimeOutlined />}>
            <Link to={`/main/dia`} />
            Dia
          </Menu.Item>
          <Menu.Item key="ano" icon={<FieldTimeOutlined />}>
            <Link to={`/main/ano`} />
            Ano
          </Menu.Item>
          <Menu.Item key="fase" icon={<FieldTimeOutlined />}>
            <Link to={`/main/fase`} />
            Fase
          </Menu.Item>
          <Menu.Item key="matricula" icon={<FieldTimeOutlined />}>
            <Link to={`/main/matricula`} />
            Matricular
          </Menu.Item>

          <Menu.Item key="usuario" icon={<UserSwitchOutlined />}>
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
            <Route path={`/main/ano`}>
              <AnoMain />
            </Route>
            <Route path={`/main/dia`}>
              <DiaMain />
            </Route>
            <Route path={`/main/fase`}>
              <FaseMain />
            </Route>
            <Route path={`/main/serie`}>
              <SerieMain />
            </Route>
            <Route path={`/main/materia`}>
              <MateriaMain />
            </Route>
            <Route path={`/main/matricula`}>
              <MatriculaMain />
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
