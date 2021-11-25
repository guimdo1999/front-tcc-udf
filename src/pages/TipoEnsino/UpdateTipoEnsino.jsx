import React from "react";
import { Form, Input, Button, Select } from "antd";
import { putTipo_ensino } from "../../Utils/TipoEnsino";

function UpdateTipoEnsino({ handleOk, tipo_ensino }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    putTipo_ensino(tipo_ensino.id_tipo_ensino, values).then(() => {
      alert(`Editado o tipo de ensino: ${values.nome_tipo_ensino}`);
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
        nome_tipo_ensino: tipo_ensino.nome_tipo_ensino,
        is_active: tipo_ensino.is_active,
      }}
    >
      <Form.Item
        name={"nome_tipo_ensino"}
        label="Tipo de Ensino"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: Médio / Fundamental / Diferencial" />
      </Form.Item>
      <Form.Item
        name={"is_active"}
        label="Está ATIVO?"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Selecione sim ou não">
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

export default UpdateTipoEnsino;
