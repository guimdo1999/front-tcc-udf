import React from "react";

import { Button, Card, Col, Row } from "antd";
import FormDisciplina from "../../components/Cadastros/FormDisciplina";
import UseVisibilityToggler from "../../hooks/useVisibilityToggler";

function DisciplinasMain() {
  const [CadastroDisciplinaForm, toggleVisibility] = UseVisibilityToggler(
    <FormDisciplina />,
    false
  );
  return (
    <>
      <Card title="Gerenciamento de Disciplinas" style={{ width: "100%" }}>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibility}>
              Cadastrar Disciplina
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary">Alterar Disciplina</Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Disciplina
            </Button>
          </Col>
        </Row>
      </Card>
      {CadastroDisciplinaForm}
    </>
  );
}

export default DisciplinasMain;
