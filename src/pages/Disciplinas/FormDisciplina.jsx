import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { insertDisciplina } from "../../Utils/Disciplina";

function FormDisciplina({ handleOk }) {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      number: "${label} não é um número válido!",
    },
  };
  const onFinish = (values) => {
    insertDisciplina(values).then(() => {
      alert(`Cadastrado a disciplina: ${values.nome_disciplina}`);
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
        name={"nome_disciplina"}
        label="Nome da Disciplina"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: Matemática" />
      </Form.Item>
      <Form.Item
        name={"aula_exclusiva"}
        label="Aula exclusiva"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Selecione sim ou não.">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={"qtd_carga_horaria"}
        label="Carga Horária"
        rules={[{ type: "number", required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name={"qtd_aulas"}
        label="Quantia de Aulas"
        rules={[{ type: "number", required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormDisciplina;
