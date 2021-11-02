import React from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Card,
} from "antd";

function CadastroFormAluno() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 },
  };
  const dateFormat = "DD/MM/YYYY";

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      email: "${label} não é um e-mail válido!",
      number: "${label} não é um número válido!",
    },
    number: {
      range: "${label} deve ser entre ${min} and ${max}",
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
          name={["user", "nom_aluno"]}
          label="Nome"
          rules={[{ required: true }]}
        >
          <Input placeholder="EX: Rogério Silva de Souza" />
        </Form.Item>

        <Form.Item label="Sexo" required>
          <Select style={{ width: "30%" }} placeholder="Selecione um gênero">
            <Select.Option value="M">Masculino</Select.Option>
            <Select.Option value="F">Feminino</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nascimento" required>
          <DatePicker
            placeholder="Selecione a data"
            style={{ width: "30%" }}
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          name={["user", "num_matricula"]}
          label="Mátricula"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={["user", "num_telefone"]}
          label="Telefone"
          rules={[{ type: "number" }]}
        >
          <InputNumber style={{ width: "50%" }} placeholder="61981234567" />
        </Form.Item>
        <Form.Item
          name={["user", "nom_email_aluno"]}
          label="E-mail"
          rules={[{ type: "email" }]}
        >
          <Input style={{ width: "75%" }} placeholder="email@email.com" />
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

export default CadastroFormAluno;
