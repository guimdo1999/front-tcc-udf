import React from "react";

import { Button, Card, Col, Row } from "antd";
import UseVisibilityToggler from "../../hooks/useVisibilityToggler";
import FormAluno from "../../components/Cadastros/FormAluno";
import SelectFunction from "../../components/Select/SelectFunction";

function AlunosMain() {
  const [CadastroAlunoForm, toggleVisibilityCadastro] = UseVisibilityToggler(
    <FormAluno />,
    false
  );

  const [AlunoSelect, toggleVisibilityBusca] = UseVisibilityToggler(
    <SelectFunction expr="aluno" />,
    false
  );

  return (
    <>
      <Card title="Gerenciamento de Alunos" style={{ width: "100%" }}>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibilityCadastro}>
              Cadastrar Aluno
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibilityBusca}>
              Editar Aluno
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Aluno
            </Button>
          </Col>
        </Row>
      </Card>
      {AlunoSelect}
      {CadastroAlunoForm}
    </>
  );
}

export default AlunosMain;
