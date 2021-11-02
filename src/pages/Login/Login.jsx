import React from "react";
import "./estilo.css";
import { Form, Input, Button, Checkbox, Row, Col, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { login } from "../../Utils/Login";
import Cookies from "universal-cookie";

export const cookies = new Cookies();

const Login = () => {
  const history = useHistory();
  const onFinish = (values) => {
    console.log("Received values of form", values);

    const usuario = login(values.cod_login, values.cod_senha).then((data) => {
      cookies.set("auth_token", data.authToken.token, { path: "/" });

      console.log(data);
      history.push("/main/home");
    });
  };
  function onRegistro() {
    history.push("/registrar");
  }

  return (
    <Row>
      <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}></Col>

      <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}>
        <br></br>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          method="POST"
        >
          <Form.Item
            name="cod_login"
            rules={[
              { required: true, message: "Por favor, insira seu usuário" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Usuário"
            />
          </Form.Item>
          <Form.Item
            name="cod_senha"
            rules={[{ required: true, message: "Por favor, insira sua senha" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Senha"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembre-se de mim.</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Logar
              </Button>
              <Button
                type="primary"
                className="login-form-button"
                onClick={onRegistro}
              >
                Registrar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}></Col>
    </Row>
  );
};

export default Login;
