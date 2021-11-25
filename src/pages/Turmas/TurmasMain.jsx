import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteTurma, getTurma } from "../../Utils/Turma";
import { getTurno } from "../../Utils/Turno";
import { getTipo_ensino } from "../../Utils/TipoEnsino";

import FormTurma from "./FormTurma";
import UpdateTurma from "./UpdateTurma";

function TurmasMain() {
  const [busca, setBusca] = useState([]);
  const [turno, setTurno] = useState();
  const [turma, setTurma] = useState();
  const [tipoEnsino, setTipoEnsino] = useState();

  const [valueF, setValueF] = useState("");
  const [reload, setReload] = useState(false);

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
    if (valueF === "" || reload === true) {
      getTurma().then((data) => {
        setBusca(data);
      });
      getTurno().then((data) => {
        setTurno(data);
      });
      getTipo_ensino().then((data) => {
        setTipoEnsino(data);
      });
      setReload(false);
    }
  }, [valueF, reload]);

  const columns = [
    {
      title: "Nome da Turma",
      dataIndex: "nome_turma",
      key: "nome_turma",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_turma.localeCompare(b.nome_turma),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ano da Turma",
      dataIndex: "ano_turma",
      key: "ano_turma",
    },
    {
      title: "Quantidade de Meses",
      dataIndex: "qtd_meses",
      key: "qtd_meses",
    },
    {
      title: "Tipo de Calendário",
      dataIndex: "tipo_de_calendario",
      key: "tipo_de_calendario",
    },
    {
      title: "Turno",
      dataIndex: "id_turno",
      key: "id_turno",

      render: (id) => {
        if (turno) {
          const found = turno.find((obj) => obj.id_turno === id);
          return found.nome_turno;
        }
      },
    },
    {
      title: "Tipo Ensino",
      dataIndex: "id_tipo_ensino",
      key: "id_tipo_ensino",

      render: (id) => {
        if (tipoEnsino) {
          const found = tipoEnsino.find((obj) => obj.id_tipo_ensino === id);
          return found.nome_tipo_ensino;
        }
      },
    },

    {
      title: "Alunos",
      dataIndex: "Alunos",
      key: "Alunos",

      render: (Alunos) => {
        if (Alunos) {
          return <p>{Alunos.map((alunos) => alunos.nome_aluno + ", ")}</p>;
        }
      },
    },

    {
      title: "Ações",
      key: "id_turma",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setTurma(record);
              setModalContent(
                <Modal
                  title={`Editando a Turma: ${record.nome_turma}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateTurma turma={turma} handleOk={handleOk} />
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
                  title={`Deletanda a Turma: ${record.nome_turma}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar a turma: {record.nome_turma}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteTurma(record.id_turma).then(() => {
                        alert(`Deletado a Turma: ${record.nome_turma}`);

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
    <Card title="Gerenciamento de Turma" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando nova Turma:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormTurma handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Turma
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Turma"
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
      />

      <Table
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={busca}
        showSorterTooltip={false}
        footer={() => {
          if (busca) {
            if (!valueF) {
              return (
                <h5>
                  Existem <b>{busca.length}</b> resultados.
                </h5>
              );
            } else {
              return (
                <h5>
                  Existem <b>{busca.length}</b> resultados para {valueF}.
                </h5>
              );
            }
          } else {
            return <h5>Não existem resultados.</h5>;
          }
        }}
      />
    </Card>
  );
}

export default TurmasMain;
