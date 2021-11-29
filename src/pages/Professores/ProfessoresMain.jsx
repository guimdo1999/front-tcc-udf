import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import DeletePop from "../../components/DeletePop";

import { deleteProfessor, getProfessor } from "../../Utils/Professor";

import FormProfessor from "./FormProfessor";

function ProfessoresMain() {
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
    deleteProfessor(value.id_professor)
      .then(() => {
        message.success({
          content: `Professor: ${value.nome_professor} foi deletado.`,
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
      getProfessor().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do Professor",
      dataIndex: "nome_professor",
      key: "nome_professor",

      render: (text) => <p>{text}</p>,

      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Horas trabalhadas por semana",
      dataIndex: "qtd_horas_trabalho",
      key: "qtd_horas_trabalho",
    },
    {
      title: "Email",
      dataIndex: "email_professor",
      key: "email_professor",
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
      key: "id_professor",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando o Professor: ${record.nome_professor}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormProfessor professor={record} handleOk={handleOk} />
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
    <Card title="Gerenciamento de Professors" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo Professor:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormProfessor handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Professor
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Professor"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_professor.toLocaleLowerCase().includes(valorAtual)
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

export default ProfessoresMain;
