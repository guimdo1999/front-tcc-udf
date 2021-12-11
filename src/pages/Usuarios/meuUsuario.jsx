import React, { useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { getMe, logout, putUsuario } from "../../Utils/Login";
import { useHistory } from "react-router-dom";
import { cookies } from "../Login/Login";

function MeuUsuario() {
  var cod_login = "";
  var id_user = 0;
  var cod_perfil = "";
  const history = useHistory();

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
        id: id_user,
        cod_perfil: cod_perfil,
        cod_senha: values.cod_senha,
      };
      console.log(values);

      putUsuario(values.id, values).then(() => {
        alert(`Atualizado o usuário: ${cod_login}, logue novamente.`);
        Logout();
      });
    }
  };
  const Logout = () => {
    logout().then(() => {
      cookies.remove("auth_token");
      history.push("/");
      document.location.reload();
    });
  };

  useEffect(() => {
    getMe().then((data) => {
      cod_login = data.cod_login;
      id_user = data.id;
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
