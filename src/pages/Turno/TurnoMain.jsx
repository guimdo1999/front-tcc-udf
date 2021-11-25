import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteTurno, getTurno } from "../../Utils/Turno";
import UpdateTurno from "./UpdateTurno";
import FormTurno from "./FormTurno";

function TurnoMain() {
  const [busca, setBusca] = useState([]);
  const [turno, setTurno] = useState();
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
    setModalContent("");
    setReload(false);
  };

  /**/

  useEffect(() => {
    if (valueF === "" || reload === true) {
      getTurno().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do Tipo de Ensino",
      dataIndex: "nome_turno",
      key: "nome_turno",

      render: (text) => <p>{text}</p>,

      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ações",
      key: "id_turno",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setTurno(record);
              setModalContent(
                <Modal
                  title={`Editando o Turno: ${record.nome_turno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateTurno turno={turno} handleOk={handleOk} />
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
                  title={`Deletando o Tipo de Ensino: ${record.nome_turno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar o tipo de Ensino{" "}
                    {record.nome_turno}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteTurno(record.id_turno).then(() => {
                        alert(`Deletado o Turno: ${record.nome_turno}`);

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
    <Card title="Gerenciamento de Turnos" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo Turno:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormTurno handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Turno
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Turno"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_tipo_ensino.toLocaleLowerCase().includes(valorAtual)
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

export default TurnoMain;
