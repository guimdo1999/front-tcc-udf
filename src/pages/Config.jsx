import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { getConfigId, updateConfig } from "../Utils/Config";

function ConfigMain({ Config }) {
  //const [config, setconfig] = useState([]);
  const [reload, setReload] = useState(false);
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 9 },
  };

  const [config, setconfig] = useState([]);

  //console.log(Config);

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const key = "updatable";
  const onFinish = (values) => {
    message.loading({
      content: `Atualizando as Configurações.`,
      key,
    });

    updateConfig(values)
      .then(() => {
        message.success({
          content: "Configuração Atualizada!",
          key,
          duration: 2,
        });
        setReload(true);
      })
      .catch(() => {
        message.error({ content: `Falha ao comunicar com o servidor.`, key });
      });
  };

  useEffect(() => {
    getConfigId().then((data) => {
      setconfig(data.data);
      console.log(config);
    });
  }, []);

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={{
        qtd_max_aulas: config?.qtd_max_aulas,
        //exibir_percentual: config.exibir_percentual,
        //per_dois_professores: config.per_dois_professores,
        //per_carga_hor_superior: config.per_carga_hor_superior,
        //desativar_turmas_janeiro: config.desativar_turmas_janeiro,
        //desativar_turma_jul: config.desativar_turma_jul,
      }}
    >
      <Form.Item
        name={"qtd_max_aulas"}
        label="Quantidade de Aulas Consecutivas"
        rules={[{ required: true }]}
      >
        <Input placeholder="EX: 2, 3, 4" />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          Atualizar
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ConfigMain;
