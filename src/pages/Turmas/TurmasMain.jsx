import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import DeletePop from "../../components/DeletePop";

import { deleteTurma, getTurma } from "../../Utils/Turma";

import FormTurma from "./FormTurma";

import moment from "moment";

function TurmasMain() {
  const [busca, setBusca] = useState([]);
  const [valueF, setValueF] = useState("");
  const [reload, setReload] = useState(false);
  const key = "updatable";

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
    deleteTurma(value.id_turma)
      .then(() => {
        message.success({
          content: `Turma: ${value.nome_turma} foi deletado.`,
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

  useEffect(() => {
    if (valueF === "" || reload === true) {
      getTurma().then((data) => {
        setBusca(data);
        setReload(false);
      });
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
      title: "Data de Inicio",
      dataIndex: "data_inicio",
      key: "data_inicio",
      render: (data) => {
        return moment(data).format("DD/MM/YYYY");
      },
    },
    {
      title: "Data de Fim",
      dataIndex: "data_fim",
      key: "data_fim",
      render: (data) => {
        return moment(data).format("DD/MM/YYYY");
      },
    },
    {
      title: "Série",
      dataIndex: "Series",
      key: "Series",
      render: (Series) => {
        if (Series) {
          return Series.nome_serie;
        } else {
          return null;
        }
      },
    },
    {
      title: "Turno",
      dataIndex: "Turnos",
      key: "Turnos",
      render: (Turnos) => {
        if (Turnos) {
          return Turnos.nome_turno;
        } else {
          return null;
        }
      },
    },
    {
      title: "Está Ativo",
      dataIndex: "is_active",
      key: "is_active",
      filters: [
        {
          text: "Sim",
          value: "Sim",
        },
        {
          text: "Não",
          value: "Não",
        },
      ],
      onFilter: (value, record) => record.is_active.indexOf(value) === 0,
    },
    {
      title: "Ações",
      key: "id_turma",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando a Turma: ${record.nome_turma}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormTurma turma={record} handleOk={handleOk} />
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
    <Card title="Gerenciamento de Turmas" style={{ width: "100%" }}>
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
