import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, InputNumber } from "antd";
import { insertMateria, putMateriaId } from "../../Utils/Materia";
import { getDisciplina } from "../../Utils/Disciplina";
import { getSerie } from "../../Utils/Serie";

function FormMateria({ handleOk, materia }) {
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  };

  const [disciplina, setDisciplina] = useState([]);
  const [serie, setSerie] = useState([]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  useEffect(() => {
    getDisciplina().then((data) => {
      setDisciplina(data);
    });
    getSerie().then((data) => {
      setSerie(data);
    });
  }, []);

  const key = "updatable";
  const onFinish = (values) => {
    if (!materia) {
      message.loading({
        content: `Cadastrando o Materia: ${values.nome_materia}.`,
        key,
      });
      insertMateria(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Materia: ${values.nome_materia}.`,
        key,
      });
      putMateriaId(materia.id_materia, values)
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
        nome_materia: materia?.nome_materia,
        is_active: materia?.is_active,
        qtd_materia: materia?.qtd_materia,
        fk_disciplina: materia?.fk_disciplina,
        fk_serie: materia?.fk_serie,
      }}
    >
      <Form.Item
        name={"nome_materia"}
        label="Nome da Materia"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Literatura, Gramática, Cálculo / Matemática..." />
      </Form.Item>

      <Form.Item
        label="Está ativo?"
        name={"is_active"}
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Está ativo?">
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name={"fk_disciplina"} label="Disciplina">
        <Select style={{ width: "100%" }} placeholder="Selecione um disciplina">
          {disciplina.map((item) => {
            return (
              <Select.Option value={item.id_disciplina}>
                {item.nome_disciplina}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name={"fk_serie"} label="Série">
        <Select style={{ width: "100%" }} placeholder="Selecione um serie">
          {serie.map((item) => {
            return (
              <Select.Option value={item.id_serie}>
                {item.nome_serie}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={"qtd_materia"}
        label="Aulas/Semana"
        rules={[{ required: true }]}
      >
        <InputNumber placeholder="EX: 2 / 4 / 10" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormMateria;
