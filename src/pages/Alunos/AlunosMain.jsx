import React from "react";

import { Button, Card, Col, Row } from "antd";
import UseVisibilityToggler from "../../hooks/useVisibilityToggler";
import CadastroFormAluno from "../../components/Alunos/CadastroFormAluno";

function AlunosMain() {
  const [CadastroAlunoForm, toggleVisibility] = UseVisibilityToggler(
    <CadastroFormAluno />,
    false
  );

  return (
    <>
      <Card title="Gerenciamento de Alunos" style={{ width: "100%" }}>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibility}>
              Cadastrar Aluno
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary">Editar Aluno</Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Aluno
            </Button>
          </Col>
        </Row>
      </Card>
      {CadastroAlunoForm}
    </>
  );
}

export default AlunosMain;
