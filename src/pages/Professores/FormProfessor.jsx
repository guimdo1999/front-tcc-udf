import React from "react";
import { Form, Input, Button, Select, message, InputNumber } from "antd";
import { insertProfessor, putProfessorId } from "../../Utils/Professor";

function FormProfessor({ handleOk, professor }) {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const key = "updatable";
  const onFinish = (values) => {
    if (!professor) {
      message.loading({
        content: `Criando Professor: ${values.nome_professor}.`,
        key,
      });
      insertProfessor(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Professor: ${values.nome_professor}.`,
        key,
      });

      putProfessorId(professor.id_professor, values)
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
        nome_professor: professor?.nome_professor,
        qtd_horas_trabalho: professor?.qtd_horas_trabalho,
        matricula: professor?.matricula,
        email_professor: professor?.email_professor,
        is_active: professor?.is_active,
      }}
    >
      <Form.Item
        name={"nome_professor"}
        label="Nome Professor"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Jamilton Damasceno" />
      </Form.Item>

      <Form.Item
        name={"qtd_horas_trabalho"}
        label="Horas/semana"
        rules={[{ required: true }]}
      >
        <InputNumber placeholder="EX: 40" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name={"email_professor"}
        label="Email"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: jamasceno25@gmail.com" />
      </Form.Item>

      <Form.Item
        name={"is_active"}
        label="Está ativo"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Está ativo">
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

export default FormProfessor;
