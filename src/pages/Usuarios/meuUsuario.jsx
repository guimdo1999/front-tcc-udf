import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";
import { getMe, putUsuario } from "../../Utils/Login";

function MeuUsuario() {
  var cod_login = "";
  var cod_perfil = "";

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
    if (values.cod_senha !== values.cod_senha2) {
      alert("Senhas não coincidem!");
    } else {
      values = {
        cod_login: cod_login,
        cod_perfil: cod_perfil,
        cod_senha: values.cod_senha,
      };
      console.log(values);

      putUsuario(values.cod_login, values).then(() => {});
      alert(`Atualizado o usuário`);
    }
  };

  useEffect(() => {
    getMe().then((data) => {
      // eslint-disable-next-line
      cod_login = data.cod_login;
      // eslint-disable-next-line
      cod_perfil = data.cod_perfil;
    });
  }, []);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        label="Senha"
        name="cod_senha"
        rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirme a senha"
        name="cod_senha2"
        rules={[
          {
            required: true,
            message: "Por favor, insira sua senha novamente!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Atualizar senha
        </Button>
      </Form.Item>
    </Form>
  );
}

export default MeuUsuario;
