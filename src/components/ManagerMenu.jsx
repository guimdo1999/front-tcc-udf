import React, { useEffect, useState } from "react";

import "./estiloMenu.css";
import { Link, useHistory, Switch } from "react-router-dom";
import { BrowserRouter as Route } from "react-router-dom";

import { Avatar, Button, Layout, Menu } from "antd";
import {
  SmileOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BorderlessTableOutlined,
  TeamOutlined,
  FieldTimeOutlined,
  FormOutlined,
  BellOutlined,
  CalendarOutlined,
  LogoutOutlined,
  ContactsOutlined,
  HourglassOutlined,
  CalculatorOutlined,
  SolutionOutlined,
  ScheduleOutlined,
  ReadOutlined,
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
import TurnoMain from "../pages/Turno/TurnoMain";
import AulasMain from "../pages/Aulas/AulasMain";
import AnoMain from "../pages/Ano/AnoMain";
import DiaMain from "../pages/Dia/DiaMain";
import FaseMain from "../pages/Fase/FaseMain";
import SerieMain from "../pages/Serie/SerieMain";
import MateriaMain from "../pages/Materia/MateriaMain";
import MatriculaMain from "../pages/Matricular/MatriculaMain";
import Page404 from "../pages/Page404";
import MeuUsuario from "../pages/Usuarios/meuUsuario";

const { Header, Content, Footer, Sider } = Layout;

const rootSubmenuKeys = ["subLeciona", "subTurmas", "subGrade"];

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

  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
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
          <Link to={`/gerente/atualizar-senha`}>
            <Avatar size={32}>{nomeUsuario}</Avatar>
          </Link>
        </Header>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={["0"]}
        >
          {/* AQUI LIGAMOS BOTÕES AS PAGES*/}
          <Menu.Item key="home" icon={<BorderlessTableOutlined />}>
            <Link to={`/gerente/home`} />
            Home
          </Menu.Item>

          <SubMenu key="subLeciona" title="Lecionar" icon={<FormOutlined />}>
            <Menu.Item key="disciplinas" icon={<VideoCameraOutlined />}>
              <Link to={`/gerente/disciplinas`} />
              Disciplinas
            </Menu.Item>
            <Menu.Item
              key="materia"
              icon={<CalculatorOutlined />}
              href="/alunos"
            >
              <Link to={`/gerente/materia`} />
              Matéria
            </Menu.Item>
            <Menu.Item key="professores" icon={<SmileOutlined />}>
              <Link to={`/gerente/professores`} />
              Professores
            </Menu.Item>

            <Menu.Item key="aulas" icon={<BellOutlined />}>
              <Link to={`/gerente/aulas`} />
              Aulas
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="turnos" icon={<TeamOutlined />}>
            <Link to={`/gerente/turnos`} />
            Turnos
          </Menu.Item>
          <SubMenu key="subTurmas" title="Turmas" icon={<ReadOutlined />}>
            <Menu.Item key="ano" icon={<CalendarOutlined />}>
              <Link to={`/gerente/ano`} />
              Ano
            </Menu.Item>
            <Menu.Item key="fase" icon={<FieldTimeOutlined />}>
              <Link to={`/gerente/fase`} />
              Fase
            </Menu.Item>
            <Menu.Item key="serie" icon={<ContactsOutlined />}>
              <Link to={`/gerente/serie`} />
              Série
            </Menu.Item>
            <Menu.Item key="turmas" icon={<TeamOutlined />}>
              <Link to={`/gerente/turmas`} />
              Turmas
            </Menu.Item>
            <Menu.Item key="alunos" icon={<UserOutlined />}>
              <Link to={`/gerente/alunos`} />
              Alunos
            </Menu.Item>
            <Menu.Item key="matricula" icon={<SolutionOutlined />}>
              <Link to={`/gerente/matricula`} />
              Matricular
            </Menu.Item>
          </SubMenu>
          <SubMenu key="subGrade" title="Grade" icon={<ScheduleOutlined />}>
            <Menu.Item key="dia" icon={<HourglassOutlined />}>
              <Link to={`/gerente/dia`} />
              Dia
            </Menu.Item>
            <Menu.Item key="horarios" icon={<FieldTimeOutlined />}>
              <Link to={`/gerente/horarios`} />
              Horários
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <Button
            icon={<LogoutOutlined />}
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
            <Route path={`/gerente/turnos`}>
              <TurnoMain />
            </Route>
            <Route path={`/gerente/horarios`}>
              <HorariosMain />
            </Route>
            <Route path={`/gerente/aulas`}>
              <AulasMain />
            </Route>
            <Route path={`/gerente/ano`}>
              <AnoMain />
            </Route>
            <Route path={`/gerente/dia`}>
              <DiaMain />
            </Route>
            <Route path={`/gerente/fase`}>
              <FaseMain />
            </Route>
            <Route path={`/gerente/serie`}>
              <SerieMain />
            </Route>
            <Route path={`/gerente/materia`}>
              <MateriaMain />
            </Route>
            <Route path={`/gerente/matricula`}>
              <MatriculaMain />
            </Route>
            <Route path={`/gerente/atualizar-senha`}>
              <MeuUsuario />
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

export default ManagerMenu;
