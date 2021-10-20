import React from "react";

import { Button, Card, Col, Row } from "antd";

function DisciplinasMain() {
  return (
    <Card title="Gerenciamento de Disciplinas" style={{ width: "100%" }}>
      <Row>
        <Col align="center" span={8}>
          <Button type="primary">Cadastrar Disciplina</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary">Alterar Disciplina</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary" danger>
            Deletar Disciplina
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default DisciplinasMain;
