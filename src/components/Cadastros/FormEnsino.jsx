import React from "react";
import { Form, Input, Button, Card } from "antd";

function FormTurma() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
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
          name={["ensino", "nome_tipo_ensino"]}
          label="Tipo de Ensino"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Médio / Fundamental / Diferencial" />
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
