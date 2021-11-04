import React from "react";

import { Button, Card, Col, Row } from "antd";
import UseVisibilityToggler from "../../hooks/useVisibilityToggler";
import FormTurma from "../../components/Cadastros/FormTurma";
import FormEnsino from "../../components/Cadastros/FormEnsino";

function TurmasMain() {
  const [CadastroTurmaForm, toggleVisibilityTurma] = UseVisibilityToggler(
    <FormTurma />,
    false
  );
  const [CadastroEnsinoForm, toggleVisibilityEnsino] = UseVisibilityToggler(
    <FormEnsino />,
    false
  );
  return (
    <>
      <Card title="Gerenciamento de Turmas" style={{ width: "100%" }}>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibilityTurma}>
              Criar Turma
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary">Alterar Turma</Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Turma
            </Button>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibilityEnsino}>
              Criar Tipo de Ensino
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary">Alterar Tipo de Ensino</Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Tipo de Ensino
            </Button>
          </Col>
        </Row>
      </Card>
      {CadastroTurmaForm}
      {CadastroEnsinoForm}
    </>
  );
}

export default TurmasMain;
