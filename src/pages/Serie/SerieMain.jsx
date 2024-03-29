import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import { deleteSerie, getSerie } from "../../Utils/Serie";

import FormSerie from "./FormSerie";
import DeletePop from "../../components/DeletePop";

function SerieMain() {
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
    deleteSerie(value.id_serie)
      .then(() => {
        message.success({
          content: `Serie: ${value.nome_serie} foi deletado.`,
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
      getSerie().then((data) => {
        setBusca(data);
      });
    }
    setReload(false);
  }, [valueF, reload]);

  const columns = [
    {
      title: "Nome do Serie ",
      dataIndex: "nome_serie",
      key: "nome_serie",

      render: (text) => <p>{text}</p>,
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ano",
      dataIndex: "Ano",
      key: "Ano",
      render: (ano) => {
        if (ano) {
          return ano.nome_ano;
        } else {
          return null;
        }
      },
    },
    {
      title: "Fase",
      dataIndex: "Fase",
      key: "Fase",
      render: (fase) => {
        if (fase) {
          return fase.nome_fase;
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
      key: "id_serie",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando a serie: ${record.nome_serie}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormSerie serie={record} handleOk={handleOk} />
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
    <Card title="Gerenciamento de Series" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando nova Serie`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormSerie handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Série
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Série"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_serie.toLocaleLowerCase().includes(valorAtual)
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
            return <h5>Existe nenhum resultado.</h5>;
          }
        }}
      />
    </Card>
  );
}

export default SerieMain;
