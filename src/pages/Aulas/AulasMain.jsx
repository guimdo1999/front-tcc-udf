import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";

import { getTurma } from "../../Utils/Turma";
import { getProfessor } from "../../Utils/Professor";
import { deleteAula, getAulas } from "../../Utils/Aulas";
import { getDisciplina } from "../../Utils/Disciplina";
import UpdateAulas from "../../components/Update/UpdateAulas";
import FormAulas from "../../components/Cadastros/FormAulas";

function AulasMain() {
  const [busca, setBusca] = useState([]);
  const [professor, setProfessor] = useState();
  const [disciplina, setDisciplina] = useState();
  const [turma, setTurma] = useState();

  const [aula, setAula] = useState();

  //const [valueF, setValueF] = useState("");
  const [reload, setReload] = useState(true);

  /*MODAL*/
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleOk = () => {
    setModalContent("");
    setReload(true);
  };

  const handleCancel = () => {
    setReload(false);
    setModalContent("");
  };
  /**/

  useEffect(() => {
    if (reload === true) {
      getAulas().then((data) => {
        setBusca(data);
      });
      getDisciplina().then((data) => {
        setDisciplina(data);
      });
      getProfessor().then((data) => {
        setProfessor(data);
      });
      getTurma().then((data) => {
        setTurma(data);
      });
      setReload(false);
    }
  }, [reload]);

  const columns = [
    {
      title: "Nome do Professor",
      dataIndex: "id_professor",
      key: "id_professor",

      render: (id) => {
        if (professor) {
          const found = professor.find((obj) => obj.id_professor === id);
          return found.nome_professor;
        }
      },
    },
    {
      title: "Nome Disciplina",
      dataIndex: "id_disciplina",
      key: "id_disciplina",

      render: (id) => {
        if (disciplina) {
          const found = disciplina.find((obj) => obj.id_disciplina === id);
          return found.nome_disciplina;
        }
      },
    },
    {
      title: "Nome Turma",
      dataIndex: "id_turma",
      key: "id_turma",

      render: (id) => {
        if (turma) {
          const found = turma.find((obj) => obj.id_turma === id);
          return found.nome_turma;
        }
      },
    },
    {
      title: "Quantia de Aulas Semanais",
      dataIndex: "qtd_aula_semana",
      key: "qtd_aula_semana",
    },

    {
      title: "Aulas começam/começarão",
      dataIndex: "data_inicio_aula",
      key: "data_inicio_aula",
    },
    {
      title: "Aulas terminam/terminarão",
      dataIndex: "data_fim_aula",
      key: "data_fim_aula",
    },
    {
      title: "Ações",
      key: "id_aula",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setAula(record);
              setModalContent(
                <Modal
                  title={`Editando a Aula`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateAulas aula={aula} handleOk={handleOk} />
                </Modal>
              );

              setVisible(true);
            }}
          >
            Editar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Deletanda a aula`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>Gostaria mesmo de deletar essa aula??</h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteAula(record.id_aula).then(() => {
                        alert(`Deletado a Aula selecionada`);

                        handleOk();
                      });
                    }}
                  >
                    Deletar
                  </Button>
                </Modal>
              );
              setVisible(true);
            }}
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Card title="Gerenciamento de Aulas" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando nova Aula:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormAulas handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Aula
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      {/* <Search
        placeholder="Pesquisar por Disciplina"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_turma.toLocaleLowerCase().includes(valorAtual)
          );
          setBusca(filteredData);
        }}
        style={{
          width: "45%",
          float: "right",
          margin: "5px",
        }}
      /> */}

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
          } else {
            return <h5>Não existem resultados.</h5>;
          }
        }}
      />
    </Card>
  );
}

export default AulasMain;
