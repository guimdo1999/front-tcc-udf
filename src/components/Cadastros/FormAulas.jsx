import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";
import { getTurma } from "../../Utils/Turma";
import { getProfessor } from "../../Utils/Professor";
import { getDisciplina } from "../../Utils/Disciplina";
import { insertAulas } from "../../Utils/Aulas";

function FormAulas({ handleOk }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [disciplina, setDisciplina] = useState([]);
  const [professor, setProfessor] = useState([]);
  const [turma, setTurma] = useState([]);

  useEffect(() => {
    getProfessor().then((data) => {
      setProfessor(data);
    });
    getDisciplina().then((data) => {
      setDisciplina(data);
    });
    getTurma().then((data) => {
      setTurma(data);
    });
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
    types: {
      email: "${label} não é um e-mail válido!",
      number: "${label} não é um número válido!",
    },
  };
  const onFinish = (values) => {
    insertAulas(values).then(() => {
      alert(`Cadastrado uma nova Aula`);
      handleOk();
    });
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={"id_professor"}
        label="Professor:"
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
        name={"id_disciplina"}
        label="Disciplina"
        rules={[{ required: true }]}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Selecione uma Disciplina"
        >
          {disciplina.map((item) => {
            return (
              <Select.Option value={item.id_disciplina}>
                {item.nome_disciplina}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name={"id_turma"} label="Turma" rules={[{ required: true }]}>
        <Select style={{ width: "100%" }} placeholder="Selecione uma Turma">
          {turma.map((item) => {
            return (
              <Select.Option value={item.id_turma}>
                {item.nome_turma}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={"data_inicio_aula"}
        label="Inicio dessa Aula"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "100%" }} placeholder="10/02/2020" />
      </Form.Item>

      <Form.Item
        name={"data_fim_aula"}
        label="Fim dessa Aula"
        rules={[{ required: true }]}
      >
        <Input style={{ width: "100%" }} placeholder="10/12/2020" />
      </Form.Item>

      <Form.Item
        name={"qtd_aula_semana"}
        label="Quantia de aulas na Semana"
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: "100%" }} placeholder="6" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormAulas;
