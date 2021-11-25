import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { putTurma } from "../../Utils/Turma";
import { getTurno } from "../../Utils/Turno";
import { getTipo_ensino } from "../../Utils/TipoEnsino";

function UpdateTurma({ handleOk, turma }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [turno, setTurno] = useState([]);
  const [tipoEnsino, setTipoEnsino] = useState([]);

  useEffect(() => {
    getTurno().then((data) => {
      setTurno(data);
    });
    getTipo_ensino().then((data) => {
      setTipoEnsino(data);
    });
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    putTurma(turma.id_turma, values).then(() => {
      alert(`Editado a turma: ${values.nome_turma}`);
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
        nome_turma: turma.nome_turma,
        ano_turma: turma.ano_turma,
        qtd_meses: turma.qtd_meses,
        tipo_de_calendario: turma.tipo_de_calendario,
        id_turno: turma.id_turno,
        id_tipo_ensino: turma.id_tipo_ensino,
      }}
    >
      <Form.Item
        name={"nome_turma"}
        label="Nome Turma"
        rules={[{ required: true }]}
      >
        <Input placeholder="Ex: 1a, Primeiro Ano" />
      </Form.Item>

      <Form.Item name={"id_turno"} label="Turno:" rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione um Turno">
          {turno.map((item) => {
            return (
              <Select.Option value={item.id_turno}>
                {item.nome_turno}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={"id_tipo_ensino"}
        label="Tipo de Ensino:"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Selecione um Tipo">
          {tipoEnsino.map((item) => {
            return (
              <Select.Option value={item.id_tipo_ensino}>
                {item.nome_tipo_ensino}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={"ano_turma"}
        label="Ano da Turma"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "50%" }} />
      </Form.Item>
      <Form.Item
        name={"qtd_meses"}
        label="Quantia Meses"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "50%" }} placeholder="6" />
      </Form.Item>
      <Form.Item
        name={"tipo_de_calendario"}
        label="Calendário"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "75%" }} placeholder="???" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UpdateTurma;
