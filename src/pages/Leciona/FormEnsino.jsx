import React, { useEffect, useState } from "react";
import { Form, Button, Select } from "antd";
import { insertEnsino } from "../../Utils/Ensino";
import { getProfessor } from "../../Utils/Professor";
import { getDisciplina } from "../../Utils/Disciplina";

function FormEnsino({ handleOk }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [professor, setProfessor] = useState([]);
  const [disciplina, setDisciplina] = useState([]);

  useEffect(() => {
    getProfessor().then((data) => {
      setProfessor(data);
    });
    getDisciplina().then((data) => {
      setDisciplina(data);
    });
  }, []);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };
  const onFinish = (values) => {
    insertEnsino(values).then(() => {
      alert(`Professor e sua disciplina foram criados.`);
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
          {disciplina.map((item) => (
            <Select.Option value={item.id_disciplina}>
              {item.nome_disciplina}
            </Select.Option>
          ))}
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

export default FormEnsino;
