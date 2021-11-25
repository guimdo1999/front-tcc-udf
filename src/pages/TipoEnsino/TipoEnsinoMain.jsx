import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteTipo_ensino, getTipo_ensino } from "../../Utils/TipoEnsino";
import FormTipoEnsino from "./FormTipoEnsino";
import UpdateTipoEnsino from "./UpdateTipoEnsino";

function TipoEnsinoMain() {
  const [busca, setBusca] = useState([]);
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
    setModalContent("");
    setReload(false);
  };

  /**/

  useEffect(() => {
    if (valueF === "" || reload === true) {
      getTipo_ensino().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do Tipo de Ensino",
      dataIndex: "nome_tipo_ensino",
      key: "nome_tipo_ensino",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_tipo_ensino.localeCompare(b.nome_tipo_ensino),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Está ativo?",
      dataIndex: "is_active",
      key: "is_active",
    },
    {
      title: "Ações",
      key: "id_tipo_ensino",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setTipoEnsino(record);
              setModalContent(
                <Modal
                  title={`Editando o Tipo de Ensino: ${record.nome_tipo_ensino}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateTipoEnsino
                    tipo_ensino={tipoEnsino}
                    handleOk={handleOk}
                  />
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
                  title={`Deletando o Tipo de Ensino: ${record.nome_tipo_ensino}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar o tipo de Ensino{" "}
                    {record.nome_tipo_ensino}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteTipo_ensino(record.id_tipo_ensino).then(() => {
                        alert(
                          `Deletado o Tipo de Ensino: ${record.nome_tipo_ensino}`
                        );

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
    <Card title="Gerenciamento de Tipos de Ensino" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo Tipo de Ensino:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormTipoEnsino handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Tipo de Ensino
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Tipo de Ensino"
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

export default TipoEnsinoMain;
