import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { putProfessorId } from "../../Utils/Professor";

function UpdateProfessor({ professor, handleOk }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const onFinish = (values) => {
    putProfessorId(professor.id_professor, values).then(() => {
      alert(`Editado o professor: ${values.nome_professor}`);
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
        nome_professor: professor.nome_professor,
        qtd_horas_trabalho: professor.qtd_horas_trabalho,
        matricula: professor.matricula,
        telefone: professor.telefone,
        email_professor: professor.email_professor,
      }}
    >
      <Form.Item
        name={"nome_professor"}
        label="Nome"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Adalberto Fernandes" />
      </Form.Item>

      <Form.Item
        name={"matricula"}
        label="Mátricula"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name={"telefone"} label="Telefone">
        <InputNumber style={{ width: "100%" }} placeholder="61987654321" />
      </Form.Item>
      <Form.Item name={"qtd_horas_trabalho"} label="Horas/Semana">
        <InputNumber style={{ width: "100%" }} placeholder="40" />
      </Form.Item>
      <Form.Item
        name={"email_professor"}
        label="E-mail"
        rules={[{ type: "email" }]}
      >
        <Input style={{ width: "100%" }} placeholder="email@email.com" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateProfessor;
