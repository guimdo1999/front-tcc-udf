import React from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  DatePicker,
  InputNumber,
} from "antd";
import { insertAluno, putAlunoId } from "../../Utils/Aluno";

import moment from "moment";

function FormAluno({ handleOk, aluno }) {
  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      email: "${label} não é um email válido!",
    },
  };

  const format = "DD/MM/YYYY";

  const key = "updatable";
  const onFinish = (values) => {
    if (!aluno) {
      message.loading({ content: `Criando Aluno: ${values.nome_aluno}.`, key });
      insertAluno(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Aluno: ${values.nome_aluno}.`,
        key,
      });
      putAlunoId(aluno.id_aluno, values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    }
  };

  if (aluno) {
    var data_birth = moment(aluno.data_nascimento);
  }
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_aluno: aluno?.nome_aluno,
        cod_sexo: aluno?.cod_sexo,
        data_nascimento: data_birth,
        matricula: aluno?.matricula,
        email_aluno: aluno?.email_aluno,
        is_active: aluno?.is_active,
      }}
    >
      <Form.Item
        name={"nome_aluno"}
        label="Nome Aluno"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 1ºAluno / Primeiro aluno / Aluno Um" />
      </Form.Item>

      <Form.Item
        label="Mátricula"
        name={"matricula"}
        rules={[{ required: true }]}
      >
        <InputNumber placeholder="EX: 27886542" width="100%" />
      </Form.Item>

      <Form.Item
        name={"data_nascimento"}
        label="Data de Nascimento"
        rules={[{ required: true }]}
      >
        <DatePicker format={format} />
      </Form.Item>

      <Form.Item label="Sexo" name={"cod_sexo"} rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione um sexo">
          <Select.Option value="M">Masculino</Select.Option>
          <Select.Option value="F">Feminino</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Email" name={"email_aluno"} rules={[{ type: "email" }]}>
        <Input placeholder="EX: 27886542" />
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

export default FormAluno;
