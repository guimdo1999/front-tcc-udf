import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertSerie, putSerieId } from "../../Utils/Serie";
import { getAno } from "../../Utils/Ano";
import { getFase } from "../../Utils/Fase";

function FormSerie({ handleOk, serie }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [ano, setAno] = useState([]);
  const [fase, setFase] = useState([]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  useEffect(() => {
    getAno().then((data) => {
      setAno(data);
    });
    getFase().then((data) => {
      setFase(data);
    });
  }, []);

  const key = "updatable";
  const onFinish = (values) => {
    if (!serie) {
      message.loading({
        content: `Cadastrando o Serie: ${values.nome_serie}.`,
        key,
      });
      insertSerie(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Serie: ${values.nome_serie}.`,
        key,
      });
      putSerieId(serie.id_serie, values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    }
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        nome_serie: serie?.nome_serie,
        is_active: serie?.is_active,
        fk_ano: serie?.fk_ano,
        fk_fase: serie?.fk_fase,
      }}
    >
      <Form.Item
        name={"nome_serie"}
        label="Nome da Série"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 1ª Série / Segunda Série..." />
      </Form.Item>

      <Form.Item
        label="Está ativo"
        name={"is_active"}
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Está ativo?">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={"fk_ano"} label="Ano">
        <Select style={{ width: "100%" }} placeholder="Selecione um ano">
          {ano.map((item) => {
            return (
              <Select.Option value={item.id_ano}>{item.nome_ano}</Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name={"fk_fase"} label="Fase">
        <Select style={{ width: "100%" }} placeholder="Selecione um fase">
          {fase.map((item) => {
            return (
              <Select.Option value={item.id_fase}>
                {item.nome_fase}
              </Select.Option>
            );
          })}
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

export default FormSerie;
