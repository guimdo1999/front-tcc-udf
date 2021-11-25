import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import { deleteHorario, getHorario } from "../../Utils/Horario";

import FormHorario from "./FormHorario";
import UpdateHorario from "./UpdateHorario";

function HorariosMain() {
  const [busca, setBusca] = useState([]);
  const [horario, setHorario] = useState();
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
      getHorario().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do horário",
      dataIndex: "nome_horario",
      key: "nome_horario",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_horario.localeCompare(b.nome_horario),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Início do horário",
      dataIndex: "hora_inicio",
      key: "hora_inicio",
    },
    {
      title: "Fim do horário",
      dataIndex: "hora_fim",
      key: "hora_fim",
    },

    {
      title: "Ações",
      key: "id_disciplina",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setHorario(record);
              setModalContent(
                <Modal
                  title={`Editando a Horario: ${record.nome_horario}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateHorario horario={horario} handleOk={handleOk} />
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
                  title={`Deletando a horario: ${record.nome_horario}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar a horario {record.nome_horario}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteHorario(record.id_horario).then(() => {
                        alert(`Deletado o horario: ${record.nome_horario}`);

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
    <Card title="Gerenciamento de Horario" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo horario:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormHorario handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Horario
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Horario"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_disciplina.toLocaleLowerCase().includes(valorAtual)
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
        }}
      />
    </Card>
  );
}

export default HorariosMain;
