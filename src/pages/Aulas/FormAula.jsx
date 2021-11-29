import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { insertAula, putAulaId } from "../../Utils/Aula";
import { getProfessor } from "../../Utils/Professor";
import { getMateria } from "../../Utils/Materia";

function FormAula({ handleOk, aula }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [professor, setProfessor] = useState([]);
  const [materia, setMateria] = useState([]);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  useEffect(() => {
    getProfessor().then((data) => {
      setProfessor(data);
    });
    getMateria().then((data) => {
      setMateria(data);
    });
  }, []);

  const key = "updatable";
  const onFinish = (values) => {
    if (!aula) {
      message.loading({
        content: `Cadastrando a Aula: ${values.nome_aula}.`,
        key,
      });
      insertAula(values)
        .then((resposta) => {
          message.success({ content: resposta.message, key, duration: 2 });
          handleOk();
        })
        .catch(() => {
          message.error({ content: `Falha ao comunicar com o servidor.`, key });
        });
    } else {
      message.loading({
        content: `Editando o Aula: ${values.nome_aula}.`,
        key,
      });
      putAulaId(aula.id_aula, values)
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
        nome_aula: aula?.nome_aula,
        is_active: aula?.is_active,
      }}
    >
      <Form.Item
        name={"nome_aula"}
        label="Nome da Aula"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: Julio Português" />
      </Form.Item>

      <Form.Item
        label="Está ativo"
        name={"is_active"}
        rules={[{ required: true }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Está ativo?"
          rules={[{ required: true }]}
        >
          <Select.Option value="Sim">Sim</Select.Option>
          <Select.Option value="Não">Não</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name={"fk_professor"}
        label="Professor"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Selecione um professor">
          {professor.map((item) => {
            return (
              <Select.Option value={item.id_professor}>
                {item.nome_professor}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={"fk_materia"}
        label="Matéria"
        rules={[{ required: true }]}
      >
        <Select style={{ width: "100%" }} placeholder="Selecione um materia">
          {materia.map((item) => {
            return (
              <Select.Option value={item.id_materia}>
                {item.nome_materia}
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

export default FormAula;
