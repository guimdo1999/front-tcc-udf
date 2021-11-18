import React from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";
import { putTurma } from "../../Utils/Turma";

function UpdateTurma({ handleOk, turma }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    putTurma(values).then(() => {
      alert(`Cadastrado o tipo de ensino: ${values.nome_turma}`);
      handleOk();
    });
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_turma: turma.nome_turma,
        ano_turma: turma.ano_turma,
        qtd_meses: turma.qtd_meses,
        tipo_de_calendario: turma.tipo_de_calendario,
      }}
    >
      <Form.Item
        name={"nome_turma"}
        label="Nome Turma"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: 1a, Primeiro Ano" />
      </Form.Item>

      <Form.Item
        name={"ano_turma"}
        label="Ano da Turma"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item
        name={"qtd_meses"}
        label="Quantia Meses"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "50%" }} placeholder="6" />
      </Form.Item>
      <Form.Item
        name={"tipo_de_calendario"}
        label="Tipo de calendário"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "75%" }} placeholder="???" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateTurma;
