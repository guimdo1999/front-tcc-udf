import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import DeletePop from "../../components/DeletePop";

import { deleteTurno, getTurno } from "../../Utils/Turno";

import FormTurno from "./FormTurno";

function TurnoMain() {
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
    deleteTurno(value.id_turno)
      .then(() => {
        message.success({
          content: `Turno: ${value.nome_turno} foi deletado.`,
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
      getTurno().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF, reload]);

  const columns = [
    {
      title: "Nome do Turno",
      dataIndex: "nome_turno",
      key: "nome_turno",

      render: (text) => <p>{text}</p>,

      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
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
      key: "id_turno",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando o Turno: ${record.nome_turno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormTurno turno={record} handleOk={handleOk} />
                </Modal>
              );
              setVisible(true);
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
            entry.nome_turno.toLocaleLowerCase().includes(valorAtual)
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
