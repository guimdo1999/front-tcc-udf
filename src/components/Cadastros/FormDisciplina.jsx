import React from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";

function FormDisciplina() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
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
          name={["disciplina", "nome_disciplina"]}
          label="Tipo de Ensino"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Matemática" />
        </Form.Item>
        <Form.Item
          name={["disciplina", "aula_exclusiva"]}
          label="Aula exclusiva"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: ???" />
        </Form.Item>

        <Form.Item
          name={["disciplina", "qtd_carga_horária"]}
          label="Carga Horária"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={["disciplina", "qtd_aulas"]}
          label="Quantia de Aulas"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
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

export default FormDisciplina;
