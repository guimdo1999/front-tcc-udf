import React from "react";

import { Button, Card, Col, Row, Space } from "antd";

function TurmasMain() {
  return (
    <Card title="Gerenciamento de Turmas" style={{ width: "100%" }}>
      <Row>
        <Col align="center" span={8}>
          <Button type="primary">Criar Tipo de Ensino</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary">Alterar Tipo de Ensino</Button>
        </Col>
        <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
          <Button type="primary" danger>
            Deletar Tipo de Ensino
          </Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col align="center" span={8}>
          <Button type="primary">Criar Turma</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary">Alterar Turma</Button>
        </Col>
        <Col align="center" span={8}>
          <Button type="primary" danger>
            Deletar Turma
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default TurmasMain;
