import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertDia, putDiaId } from "../../Utils/Dia";

function FormDia({ handleOk, dia }) {
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
    if (!dia) {
      message.loading({
        content: `Cadastrando o Dia: ${values.nome_dia}.`,
        key,
      });
      insertDia(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({ content: `Editando o Dia: ${values.nome_dia}.`, key });
      putDiaId(dia.id_dia, values)
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
        nome_dia: dia?.nome_dia,
        is_active: dia?.is_active,
      }}
    >
      <Form.Item
        name={"nome_dia"}
        label="Nome do Dia"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Segunda, terça, quarta..." />
      </Form.Item>

      <Form.Item
        label="Está ativo?"
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

export default FormDia;
