import React from "react";
import { Form, Button, Select } from "antd";
import { putUsuario } from "../../Utils/Login";

function UpdateUsuario({ usuario, handleOk }) {
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
    putUsuario(usuario.cod_login, values).then(() => {
      alert(`Atualizado o usuário: ${usuario.cod_login}`);
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
        cod_perfil: usuario.cod_perfil,
      }}
    >
      <Form.Item name={"cod_perfil"} label="Tipo de perfil">
        <Select
          style={{ width: "100%" }}
          placeholder="Selecione um tipo de perfil."
        >
          <Select.Option value="Admin">Admin</Select.Option>
          <Select.Option value="Gerente">Gerente</Select.Option>
          <Select.Option value="Usuário">Usuário</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateUsuario;
