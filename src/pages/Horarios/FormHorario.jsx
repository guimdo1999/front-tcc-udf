import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, TimePicker } from "antd";
import { insertHorario, putHorarioId } from "../../Utils/Horario";
import { getDia } from "../../Utils/Dia";
import { getTurno } from "../../Utils/Turno";

import moment from "moment";

function FormHorario({ handleOk, horario }) {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 10 },
  };

  const [dia, setDia] = useState([]);
  const [turno, setTurno] = useState([]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  useEffect(() => {
    getDia().then((data) => {
      setDia(data);
    });
    getTurno().then((data) => {
      setTurno(data);
    });
  }, []);

  const key = "updatable";
  const onFinish = (values) => {
    if (!horario) {
      message.loading({
        content: `Cadastrando o Horario: ${values.nome_horario}.`,
        key,
      });

      insertHorario(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Horario: ${values.nome_horario}.`,
        key,
      });

      putHorarioId(horario.id_horario, values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    }
  };

  const format = "HH:mm";

  var hora_inicio;
  var hora_fim;

  if (horario) {
    hora_inicio = moment(horario.hora_inicio);
    hora_fim = moment(horario.hora_fim);
  } else {
    hora_inicio = "";
    hora_fim = "";
  }

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_horario: horario?.nome_horario,
        is_active: horario?.is_active,
        hora_inicio: hora_inicio,
        hora_fim: hora_fim,
        fk_dia: horario?.fk_dia,
        fk_turno: horario?.fk_turno,
      }}
    >
      <Form.Item
        name={"nome_horario"}
        label="Nome da Horario"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Primeiro horário / 1ª Hora / Hora 1" />
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

      <Form.Item name={"fk_dia"} label="Dia">
        <Select style={{ width: "100%" }} placeholder="Selecione um dia">
          {dia.map((item) => {
            return (
              <Select.Option value={item.id_dia}>{item.nome_dia}</Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name={"fk_turno"} label="Turno">
        <Select style={{ width: "100%" }} placeholder="Selecione um turno">
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
        name={"hora_inicio"}
        label="Hora inicial"
        rules={[{ required: true }]}
      >
        <TimePicker format={format} placeholder="08:25" minuteStep={5} />
        {/*<TimePicker.RangePicker format={format} />*/}
      </Form.Item>

      <Form.Item
        name={"hora_fim"}
        label="Hora final"
        rules={[{ required: true }]}
      >
        <TimePicker format={format} placeholder="09:15" minuteStep={5} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormHorario;
