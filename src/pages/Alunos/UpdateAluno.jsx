import React from "react";
import { Form, Input, InputNumber, Button, Select, DatePicker } from "antd";
import { putAlunoId } from "../../Utils/Aluno";

function UpdateAluno({ aluno, handleOk }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };
  const dateFormat = "DD/MM/YYYY";

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const onFinish = (values) => {
    values.data_nascimento = values.data_nascimento.toISOString().split("T")[0];

    putAlunoId(aluno.id_aluno, values).then(() => {
      alert(`Atualizado o aluno: ${values.nome_aluno}`);
      handleOk();
    });
  };

  return (
    <Form
      {...layout}
      name="update-aluno"
      id="update-aluno"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_aluno: aluno.nome_aluno,
        //data_nascimento: new Date(aluno.data_nascimento),
        sexo: aluno.sexo,
        matricula: aluno.matricula,
        telefone: aluno.telefone,
        email: aluno.email,
      }}
    >
      <Form.Item name={"nome_aluno"} label="Nome" rules={[{ required: true }]}>
        <Input placeholder="EX: Lúcifer" />
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

      <Form.Item
        name={"matricula"}
        label="Mátricula"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name={"telefone"} label="Telefone">
        <InputNumber style={{ width: "100%" }} placeholder="61981234567" />
      </Form.Item>
      <Form.Item name={"email"} label="E-mail" rules={[{ type: "email" }]}>
        <Input style={{ width: "100%" }} placeholder="email@email.com" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }}>
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateAluno;
