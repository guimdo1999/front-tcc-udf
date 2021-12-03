import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import DeletePop from "../../components/DeletePop";

import { deleteAluno, getAluno } from "../../Utils/Aluno";

import FormAluno from "./FormAluno";

import moment from "moment";

function AlunosMain() {
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
    deleteAluno(value.id_aluno)
      .then(() => {
        message.success({
          content: `Aluno: ${value.nome_aluno} foi deletado.`,
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
      getAluno().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF, reload]);

  const columns = [
    {
      title: "Nome do Aluno",
      dataIndex: "nome_aluno",
      key: "nome_aluno",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_aluno.localeCompare(b.nome_aluno),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Data de Nascimento",
      dataIndex: "data_nascimento",
      key: "data_nascimento",
      render: (data) => {
        return moment(data).format("DD/MM/YYYY");
      },
    },
    {
      title: "Sexo",
      dataIndex: "cod_sexo",
      key: "cod_sexo",
      filters: [
        {
          text: "Masculino",
          value: "M",
        },
        {
          text: "Feminino",
          value: "F",
        },
      ],
      onFilter: (value, record) => record.cod_sexo.indexOf(value) === 0,
    },
    {
      title: "Mátricula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Email",
      dataIndex: "email_aluno",
      key: "email_aluno",
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
      key: "id_aluno",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando o Aluno: ${record.nome_aluno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormAluno aluno={record} handleOk={handleOk} />
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
    <Card title="Gerenciamento de Alunos" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo Aluno:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormAluno handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Aluno
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Aluno"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_aluno.toLocaleLowerCase().includes(valorAtual)
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

export default AlunosMain;
