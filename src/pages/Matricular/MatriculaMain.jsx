import React, { useEffect, useState } from "react";

import {
  Button,
  Card,
  message,
  Modal,
  Row,
  Space,
  Table,
  Select,
  Form,
  DatePicker,
} from "antd";
import {
  deleteMatricula,
  getMatricula,
  insertMatricula,
} from "../../Utils/Matricula";
import { getAluno } from "../../Utils/Aluno";
import { getTurma } from "../../Utils/Turma";

import FormMatricula from "./FormMatricula";
import DeletePop from "../../components/DeletePop";
import moment from "moment";

function MatriculaMain() {
  const [busca, setBusca] = useState([]);
  const [reload, setReload] = useState(false);
  const key = "updatable";

  const [aluno, setAluno] = useState([]);
  const [turma, setTurma] = useState([]);
  const format = "DD/MM/YYYY";

  /*MODAL*/
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOk = () => {
    setModalContent("");
    setReload(true);
  };

  const handleCancel = () => {
    setModalContent("");
    setReload(false);
  };
  /*MODAL*/

  /*Pop*/
  const handlePopOk = (value) => {
    deleteMatricula(value.id_aluno_turma)
      .then(() => {
        message.success({
          content: `Matricula foi deletada.`,
          key,
        });
        handleOk();
      })
      .catch(() => {
        message.error({ content: `Falha ao comunicar com o servidor.`, key });
        handleCancel();
      });
  };
  /*Pop*/

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} precisa ser preenchido!",
  };

  const handleMatricula = (value) => {
    var alunoMatricula = aluno.find((obj) => obj.id_aluno === value.fk_aluno);
    var aluno1 = alunoMatricula.nome_aluno;
    var turmaMatricula = turma.find((obj) => obj.id_turma === value.fk_turma);
    var turma1 = turmaMatricula.nome_turma;

    message.loading({
      content: `Cadastrando a o ${aluno1} na turma: ${turma1} .`,
      key,
    });
    insertMatricula(value)
      .then((resposta) => {
        message.success({ content: resposta.message, key, duration: 2 });
        handleOk();
      })
      .catch(() => {
        message.error({ content: `Falha ao comunicar com o servidor.`, key });
      });
  };

  useEffect(() => {
    getAluno().then((data) => {
      setAluno(data);
    });
    getTurma().then((data) => {
      setTurma(data);
    });
    if (reload === true) {
      getMatricula().then((data) => {
        setBusca(data);
      });
    }
    setReload(false);
  }, [reload]);

  const columns = [
    {
      title: "Aluno",
      dataIndex: "fk_aluno",
      key: "fk_aluno",
      render: (id) => {
        if (aluno) {
          const found = aluno.find((obj) => obj.id_aluno === id);
          return found.nome_aluno;
        }
      },
      sorter: (a, b) => {
        const found1 = aluno.find((obj) => obj.id_aluno === a.fk_aluno);
        const found2 = aluno.find((obj) => obj.id_aluno === b.fk_aluno);
        if (found1 && found2) {
          return found1.nome_aluno.localeCompare(found2.nome_aluno);
        }
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Turma",
      dataIndex: "fk_turma",
      key: "fk_turma",
      render: (id) => {
        if (turma) {
          const found = turma.find((obj) => obj.id_turma === id);
          return found.nome_turma;
        }
      },
      sorter: (a, b) => {
        const found1 = turma.find((obj) => obj.id_turma === a.fk_turma);
        const found2 = turma.find((obj) => obj.id_turma === b.fk_turma);
        if (found1 && found2) {
          console.log(found1);
          return found1.nome_turma.localeCompare(found2.nome_turma);
        }
      },
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "Data da Matricula",
      dataIndex: "data_matricula",
      key: "data_matricula",
      render: (data) => {
        if (data) {
          return moment(data).format("DD/MM/YYYY");
        } else {
          return null;
        }
      },
    },
    {
      title: "Ações",
      key: "id_aluno_turma",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando a matricula`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormMatricula
                    matricula={record}
                    handleOk={handleOk}
                    aluno={aluno}
                    turma={turma}
                  />
                </Modal>
              );
              setVisible(true);
              setReload(true);
            }}
          >
            Editar
          </Button>

          <DeletePop
            deleteFunction={() => {
              handlePopOk(record);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <Card title="Gerenciamento de Matricula" style={{ width: "100%" }}>
      <Row>
        <Form onFinish={handleMatricula} validateMessages={validateMessages}>
          <Space size={"large"}>
            <Form.Item
              name={"fk_aluno"}
              label="Aluno"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Selecione um aluno"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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

            <Form.Item
              name={"fk_turma"}
              label="Turma"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Selecione uma turma"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
              label="Data da Matricula"
              rules={[{ required: true }]}
            >
              <DatePicker format={format} placeholder="Selecione uma data" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Matricular em Turma
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Row>
      <br></br>
      <br></br>
      {modalContent}

      <Table
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={busca}
        showSorterTooltip={false}
        footer={() => {
          if (busca) {
            return (
              <h5>
                Existem <b>{busca.length}</b> resultados.
              </h5>
            );
          }
        }}
      />
    </Card>
  );
}

export default MatriculaMain;
