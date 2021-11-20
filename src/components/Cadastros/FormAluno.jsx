import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import { insertAluno } from "../../Utils/Aluno";
import { getTurma } from "../../Utils/Turma";

function FormAluno({ handleOk }) {
  const [turma, setTurma] = useState([]);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };
  const dateFormat = "DD/MM/YYYY";

  useEffect(() => {
    getTurma().then((data) => {
      setTurma(data);
    });
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      email: "${label} não é um e-mail válido!",
      number: "${label} não é um número válido!",
    },
  };

  const onFinish = (values) => {
    values.data_nascimento = values.data_nascimento.toISOString().split("T")[0];

    insertAluno(values).then(() => {
      alert(`Cadastrado o aluno: ${values.nome_aluno}`);
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
      <Form.Item name={"nome_aluno"} label="Nome" rules={[{ required: true }]}>
        <Input placeholder="EX: Rogério Silva de Souza" />
      </Form.Item>

      <Form.Item label="Sexo" name={"sexo"} required>
        <Select style={{ width: "100%" }} placeholder="Selecione um gênero">
          <Select.Option value="M">Masculino</Select.Option>
          <Select.Option value="F">Feminino</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Nascimento" name={"data_nascimento"} required>
        <DatePicker
          placeholder="Selecione a data"
          style={{ width: "100%" }}
          format={dateFormat}
        />
      </Form.Item>

      <Form.Item name={"id_turma"} label="Turma:" rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione uma turma">
          {turma.map((item) => {
            return (
              <Select.Option value={item.id_turma}>
                {item.nome_turma}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={"matricula"}
        label="Mátricula"
        rules={[{ type: "number", required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Está ativo" name={"is_active"} required>
        <Select style={{ width: "100%" }} placeholder="Selecione sim ou não">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={"telefone"}
        label="Telefone"
        rules={[{ type: "number" }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="61981234567" />
      </Form.Item>
      <Form.Item name={"email"} label="E-mail" rules={[{ type: "email" }]}>
        <Input style={{ width: "100%" }} placeholder="email@email.com" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormAluno;
