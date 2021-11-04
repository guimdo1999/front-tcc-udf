import React from "react";
import { Form, Input, InputNumber, Button, Card } from "antd";
import { insertDisciplina } from "../../Utils/Disciplina";

function FormDisciplina() {
  const layout = {
    labelCol: { span: 3 },
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
    insertDisciplina(values).then(() => {
      alert(`Cadastrado a disciplina: ${values.nome_disciplina}`);
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
          name={"nome_disciplina"}
          label="Tipo de Ensino"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: Matemática" />
        </Form.Item>
        <Form.Item
          name={"aula_exclusiva"}
          label="Aula exclusiva"
          rules={[{ required: true }]}
        >
          <Input placeholder="Ex: ???" />
        </Form.Item>

        <Form.Item
          name={"qtd_carga_horaria"}
          label="Carga Horária"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
        </Form.Item>
        <Form.Item
          name={"qtd_aulas"}
          label="Quantia de Aulas"
          rules={[{ type: "number", required: true }]}
        >
          <InputNumber style={{ width: "50%" }} />
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

export default FormDisciplina;
