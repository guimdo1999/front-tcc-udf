import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import FormDisciplina from "./FormDisciplina";

import { deleteDisciplina, getDisciplina } from "../../Utils/Disciplina";
import DeletePop from "../../components/DeletePop";

function DisciplinasMain() {
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
    setReload(false);
    setModalContent("");
  };
  /**/

  /*Pop*/
  const handlePopOk = (value) => {
    deleteDisciplina(value.id_disciplina)
      .then(() => {
        message.success({
          content: `Disciplina: ${value.nome_disciplina} foi deletado.`,
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
      getDisciplina().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF, reload]);

  const columns = [
    {
      title: "Nome da disciplina",
      dataIndex: "nome_disciplina",
      key: "nome_disciplina",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_disciplina.localeCompare(b.nome_disciplina),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Está ativa",
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
      key: "id_disciplina",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando a Disciplina: ${record.nome_disciplina}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormDisciplina handleOk={handleOk} disciplina={record} />
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
    <Card title="Gerenciamento de Disciplinas" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando nova disciplina:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormDisciplina handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Disciplina
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Disciplina"
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

export default DisciplinasMain;
