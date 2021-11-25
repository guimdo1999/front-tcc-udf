import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { insertProfessor } from "../../Utils/Professor";

function FormProfessor() {
  const layout = {
    labelCol: { span: 6 },
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

  const onFinish = (values) => {
    insertProfessor(values).then(() => {
      alert(`Cadastrado o professor: ${values.nome_professor}`);
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
        name={"nome_professor"}
        label="Nome"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Adalberto Fernandes" />
      </Form.Item>

      <Form.Item
        name={"matricula"}
        label="Mátricula"
        rules={[{ type: "number", required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={"telefone"}
        label="Telefone"
        rules={[{ type: "number" }]}
      >
        <InputNumber placeholder="61987654321" />
      </Form.Item>
      <Form.Item
        name={"qtd_horas_trabalho"}
        label="Horas/Semana"
        rules={[{ type: "number" }]}
      >
        <InputNumber placeholder="40" />
      </Form.Item>
      <Form.Item
        name={"email_professor"}
        label="E-mail"
        rules={[{ type: "email" }]}
      >
        <Input placeholder="email@email.com" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormProfessor;
