import React from "react";
import { Form, Input, Button } from "antd";
import { insertTurno } from "../../Utils/Turno";

function FormTurno({ handleOk }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    insertTurno(values).then(() => {
      alert(`Cadastrado o turno: ${values.nome_turno}`);
      handleOk();
    });
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"nome_turno"}
        label="Nome Turno"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Matutino, Vespertino, Noturno" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormTurno;
