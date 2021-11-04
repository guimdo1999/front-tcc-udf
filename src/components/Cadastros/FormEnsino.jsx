import React from "react";
import { Form, Input, Button, Card } from "antd";
import { insertTipo_ensino } from "../../Utils/TipoEnsino";

function FormTurma() {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    insertTipo_ensino(values).then(() => {
      alert(`Cadastrado o tipo de ensino: ${values.nome_tipo_ensino}`);
    });
  };
  return (
    <Card>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"nome_tipo_ensino"}
          label="Tipo de Ensino"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Médio / Fundamental / Diferencial" />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default FormTurma;
