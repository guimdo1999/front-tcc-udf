import React from "react";
import { Form, Input, Button } from "antd";
import { insertHorario } from "../../Utils/Horario";

function FormHorario({ handleOk }) {
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
    insertHorario(values).then(() => {
      alert(`Cadastrado o horário: ${values.nome_horario}`);
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
        name={"nome_horario"}
        label="Nome do Horario"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: 1ª aula / Primeira Aula / Aula 1" />
      </Form.Item>

      <Form.Item name={"num_ordem"} label="Ordem" rules={[{ required: true }]}>
        <Input style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name={"hora_inicio"}
        label="Hora Inicial"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "100%" }} placeholder="Ex: 08:45" />
      </Form.Item>

      <Form.Item
        name={"hora_fim"}
        label="Hora Final"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "100%" }} placeholder="Ex: 09:30" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormHorario;
