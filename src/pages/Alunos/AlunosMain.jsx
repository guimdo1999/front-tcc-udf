import React from "react";

import { Button, Card, Col, Row } from "antd";

function AlunosMain() {
  return (
    <Card title="Gerenciamento de Alunos" style={{ width: "100%" }}>
      <Row>
        <Col align="center" span={8}>
          <Button type="primary">Cadastrar Aluno</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary">Editar Aluno</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary" danger>
            Deletar Aluno
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default AlunosMain;
