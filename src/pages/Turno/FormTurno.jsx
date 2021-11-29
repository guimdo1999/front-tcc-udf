import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertTurno, putTurnoId } from "../../Utils/Turno";

function FormTurno({ handleOk, turno }) {
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
    if (!turno) {
      message.loading({ content: `Criando Turno: ${values.nome_turno}.`, key });
      insertTurno(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Turno: ${values.nome_turno}.`,
        key,
      });
      putTurnoId(turno.id_turno, values)
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
        nome_turno: turno?.nome_turno,
        is_active: turno?.is_active,
      }}
    >
      <Form.Item
        name={"nome_turno"}
        label="Nome Turno"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 1ºTurno / Primeiro turno / Turno Um" />
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

export default FormTurno;
