import React from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { putDisciplinaId } from "../../Utils/Disciplina";

function UpdateDisciplina({ disciplina, handleOk }) {
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
    putDisciplinaId(disciplina.id_disciplina, values).then(() => {
      alert(`Cadastrado a disciplina: ${values.nome_disciplina}`);
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
        nome_disciplina: disciplina.nome_disciplina,
        aula_exclusiva: disciplina.aula_exclusiva,
        qtd_carga_horaria: disciplina.qtd_carga_horaria,
        qtd_aulas: disciplina.qtd_aulas,
      }}
    >
      <Form.Item
        name={"nome_disciplina"}
        label="Disciplina"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: Matemática" />
      </Form.Item>
      <Form.Item name={"aula_exclusiva"} label="Aula exclusiva">
        <Select style={{ width: "100%" }} placeholder="Selecione sim ou não.">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={"qtd_carga_horaria"} label="Carga Horária">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name={"qtd_aulas"} label="Quantia de Aulas">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateDisciplina;
