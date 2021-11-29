import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import { deleteAula, getAula } from "../../Utils/Aula";

import FormAula from "./FormAula";
import DeletePop from "../../components/DeletePop";

function AulasMain() {
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
    deleteAula(value.id_aula)
      .then(() => {
        message.success({
          content: `Aula: ${value.nome_aula} foi deletado.`,
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
      getAula().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome da Aula",
      dataIndex: "nome_aula",
      key: "nome_aula",

      render: (text) => <p>{text}</p>,

      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Professor",
      dataIndex: "Professor",
      key: "Professor",
      render: (professor) => {
        if (professor) {
          return professor.nome_professor;
        } else {
          return null;
        }
      },
    },
    {
      title: "Matéria",
      dataIndex: "Materium",
      key: "Materium",
      render: (materia) => {
        if (materia) {
          return materia.nome_materia;
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
      key: "id_aula",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando a aula: ${record.nome_aula}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormAula aula={record} handleOk={handleOk} />
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
                <FormAula handleOk={handleOk} />
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
      <Search
        placeholder="Pesquisar por Aula"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_aula.toLocaleLowerCase().includes(valorAtual)
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

export default AulasMain;
