import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, DatePicker } from "antd";
import { insertTurma, putTurmaId } from "../../Utils/Turma";
import { getSerie } from "../../Utils/Serie";

import moment from "moment";
import { getTurno } from "../../Utils/Turno";

function FormTurma({ handleOk, turma }) {
  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 12 },
  };

  const [serie, setSerie] = useState([]);
  const [turno, setTurno] = useState([]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const key = "updatable";
  const onFinish = (values) => {
    if (!turma) {
      message.loading({ content: `Criando Turma: ${values.nome_turma}.`, key });
      insertTurma(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Turma: ${values.nome_turma}.`,
        key,
      });
      putTurmaId(turma.id_turma, values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    }
  };

  const format = "DD/MM/YYYY";
  var data_inicio;
  var data_fim;

  if (turma) {
    data_inicio = moment(turma.data_inicio);
    data_fim = moment(turma.data_fim);
  } else {
    data_inicio = "";
    data_fim = "";
  }

  useEffect(() => {
    getSerie().then((data) => {
      setSerie(data);
    });
    getTurno().then((data) => {
      setTurno(data);
    });
  }, []);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_turma: turma?.nome_turma,
        data_inicio: data_inicio,
        data_fim: data_fim,
        fk_serie: turma?.fk_serie,
        fk_turno: turma?.fk_turno,
        is_active: turma?.is_active,
      }}
    >
      <Form.Item
        name={"nome_turma"}
        label="Nome Turma"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 1ºTurma / Primeiro turma / Turma Um" />
      </Form.Item>

      <Form.Item
        name={"data_inicio"}
        label="Data de Inicio"
        rules={[{ required: true }]}
      >
        <DatePicker format={format} placeholder="01/01/2021" />
      </Form.Item>

      <Form.Item
        name={"data_fim"}
        label="Data de fim"
        rules={[{ required: true }]}
      >
        <DatePicker format={format} placeholder="31/12/2021" />
      </Form.Item>

      <Form.Item name={"fk_serie"} label="Série" rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione uma Série">
          {serie.map((item) => {
            return (
              <Select.Option value={item.id_serie}>
                {item.nome_serie}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name={"fk_turno"} label="Turno" rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione uma Série">
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
        label="Está ativo"
        name={"is_active"}
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Está ativo">
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

export default FormTurma;
