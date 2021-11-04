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
import { insertAluno } from "../../Utils/Aluno";

function FormAluno() {
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
  };

  const onFinish = (values) => {
    insertAluno(values).then(() => {
      alert(`Cadastrado o aluno: ${values.nome_aluno}`);
    });
  };

  return (
    <Card>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"nome_aluno"}
          label="Nome"
          rules={[{ required: true }]}
        >
          <Input placeholder="EX: Rogério Silva de Souza" />
        </Form.Item>

        <Form.Item label="Sexo" name={"sexo"} required>
          <Select style={{ width: "50%" }} placeholder="Selecione um gênero">
            <Select.Option value="M">Masculino</Select.Option>
            <Select.Option value="F">Feminino</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Nascimento" name={"data_nascimento"} required>
          <DatePicker
            placeholder="Selecione a data"
            style={{ width: "50%" }}
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item
          name={"matricula"}
          label="Mátricula"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={"telefone"}
          label="Telefone"
          rules={[{ type: "number" }]}
        >
          <InputNumber style={{ width: "50%" }} placeholder="61981234567" />
        </Form.Item>
        <Form.Item name={"email"} label="E-mail" rules={[{ type: "email" }]}>
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

export default FormAluno;
