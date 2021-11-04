import React from "react";
import "./estilo.css";
import { Form, Input, Button, Checkbox, Row, Col, Space, Card } from "antd";
import { useHistory } from "react-router-dom";
import { register } from "../../Utils/Login";

const Registrar = () => {
  const history = useHistory();
  const onFinish = (values) => {
    if (values.cod_senha !== values.cod_senha2) {
      alert("Senhas não coincidem!");
    } else {
      register(values.cod_login, values.cod_senha, "0").then((data) => {
        console.log(`${data}`);
        history.push("/");
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Falha:", errorInfo);
  };

  function onLogar() {
    history.push("/");
  }

  return (
    <Row>
      <Col align="center" xs={6} sm={6} md={6} lg={6} xl={6}></Col>

      <Col align="left" xs={10} sm={10} md={10} lg={10} xl={10}>
        <br></br>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Usuário"
              name="cod_login"
              rules={[
                { required: true, message: "Por favor, insira seu usuário!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="cod_senha"
              rules={[
                { required: true, message: "Por favor, insira sua senha!" },
              ]}
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

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Lembre de mim!</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Registrar
                </Button>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={onLogar}
                >
                  Logar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col align="center" xs={8} sm={8} md={8} lg={8} xl={8}></Col>
    </Row>
  );
};

export default Registrar;
