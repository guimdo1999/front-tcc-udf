import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertDisciplina, putDisciplinaId } from "../../Utils/Disciplina";

function FormDisciplina({ handleOk, disciplina }) {
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
    if (!disciplina) {
      message.loading({
        content: `Criando Disciplina: ${values.nome_disciplina}.`,
        key,
      });
      insertDisciplina(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Disciplina: ${values.nome_disciplina}.`,
        key,
      });
      putDisciplinaId(disciplina.id_disciplina, values)
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
        nome_disciplina: disciplina?.nome_disciplina,
        is_active: disciplina?.is_active,
      }}
    >
      <Form.Item
        name={"nome_disciplina"}
        label="Nome Disciplina"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 1ºAno / Primeiro ano / Ano Um" />
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

export default FormDisciplina;
