import React from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";

function FormTurma() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      email: "${label} não é um e-mail válido!",
      number: "${label} não é um número válido!",
    },
  };
  function onFinish() {
    console.log("finished");
  }
  return (
    <Card>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "nome_turma"]}
          label="Nome Turma"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: 1a, Primeiro Ano" />
        </Form.Item>

        <Form.Item
          name={["user", "ano_turma"]}
          label="Ano da Turma"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={["user", "qtd_meses"]}
          label="Quantia Meses"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} placeholder="6" />
        </Form.Item>
        <Form.Item
          name={["user", "tipo_de_calendario"]}
          label="Tipo de calendário"
          rules={[{ required: true }]}
        >
          <Input style={{ width: "75%" }} placeholder="???" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default FormTurma;
