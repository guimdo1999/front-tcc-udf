import React from "react";
import { Form, Button, Select, message, DatePicker } from "antd";
import { putMatriculaId } from "../../Utils/Matricula";
import moment from "moment";

function FormMatricula({ handleOk, matricula, aluno, turma }) {
  const layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 18 },
  };
  const format = "DD/MM/YYYY";

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const key = "updatable";
  const onFinish = (values) => {
    message.loading({
      content: `Editando o Matricula: ${values.nome_matricula}.`,
      key,
    });
    putMatriculaId(matricula.id_aluno_turma, values)
      .then((resposta) => {
        message.success({ content: resposta.message, key, duration: 2 });
        handleOk();
      })
      .catch(() => {
        message.error({ content: `Falha ao comunicar com o servidor.`, key });
      });
  };

  var data_matricula = moment(matricula.data_matricula);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        fk_aluno: matricula?.fk_aluno,
        fk_turma: matricula?.fk_turma,
        data_matricula: data_matricula,
      }}
    >
      <Form.Item name={"fk_aluno"} label="Aluno" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecione um aluno"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {aluno.map((item) => {
            return (
              <Select.Option value={item.id_aluno}>
                {item.nome_aluno}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item name={"fk_turma"} label="Turma" rules={[{ required: true }]}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Selecione uma turma"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
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
        name={"data_matricula"}
        label="Data da Matrícula"
        rules={[{ required: true }]}
      >
        <DatePicker
          format={format}
          placeholder="Selecione uma data"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 15 }}>
        <Button type="primary" htmlType="submit">
          Editar aluno e turma
        </Button>
      </Form.Item>
    </Form>
  );
}

export default FormMatricula;
