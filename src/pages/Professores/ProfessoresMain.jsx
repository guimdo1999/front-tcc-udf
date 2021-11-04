import React from "react";

import { Button, Card, Col, Row } from "antd";
import UseVisibilityToggler from "../../hooks/useVisibilityToggler";
import FormProfessor from "../../components/Cadastros/FormProfessor";

function ProfessoresMain() {
  const [CadastroProfessorForm, toggleVisibility] = UseVisibilityToggler(
    <FormProfessor />,
    false
  );
  return (
    <>
      <Card title="Gerenciamento de Professores" style={{ width: "100%" }}>
        <Row>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" onClick={toggleVisibility}>
              Cadastrar Professor
            </Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary">Editar Professor</Button>
          </Col>
          <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
            <Button type="primary" danger>
              Deletar Professor
            </Button>
          </Col>
        </Row>
      </Card>
      {CadastroProfessorForm}
    </>
  );
}

export default ProfessoresMain;
