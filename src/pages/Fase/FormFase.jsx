import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertFase, putFaseId } from "../../Utils/Fase";

function FormFase({ handleOk, fase }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const key = "updatable";
  const onFinish = (values) => {
    if (!fase) {
      message.loading({
        content: `Cadastrando a Fase: ${values.nome_fase}.`,
        key,
      });
      insertFase(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Fase: ${values.nome_fase}.`,
        key,
      });
      putFaseId(fase.id_fase, values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    }
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_fase: fase?.nome_fase,
        is_active: fase?.is_active,
      }}
    >
      <Form.Item
        name={"nome_fase"}
        label="Nome da Fase"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Segunda, terça, quarta..." />
      </Form.Item>

      <Form.Item
        label="Está ativo"
        name={"is_active"}
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Está ativo?">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormFase;
