import React, { useEffect, useState } from "react";
import { deleteAluno, getAluno } from "../../Utils/Aluno";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import UpdateAluno from "../../components/Update/UpdateAluno";
import FormAluno from "../../components/Cadastros/FormAluno";

function AlunosMain() {
  const [busca, setBusca] = useState([]);
  const [aluno, setAluno] = useState([]);
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
      title: "Data de nascimento",
      dataIndex: "data_nascimento",
      key: "data_nascimento",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
      key: "address",
    },
    {
      title: "Matricula",
      dataIndex: "matricula",
      key: "address",
      sorter: (a, b) => a.matricula.localeCompare(b.matricula),

      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Ativo",
      dataIndex: "is_active",
      key: "is_active",
      sorter: (a, b) => a.matricula.localeCompare(b.matricula),

      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "address",
    },
    {
      title: "Ações",
      key: "id_aluno",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setAluno(record);
              setModalContent(
                <Modal
                  title={`Editando o aluno: ${record.nome_aluno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateAluno aluno={aluno} handleOk={handleOk} />
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
                  title={`Deletando o aluno: ${record.nome_aluno}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar o aluno {record.nome_aluno}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteAluno(record.id_aluno).then(() => {
                        alert(`Deletado o aluno: ${record.nome_aluno}`);

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

  /* function onChange(value) {
    console.log(value);
    getAlunoId(value).then((data) => {
      setAluno(data);
    });
  } */

  return (
    <Card title="Gerenciamento de Alunos" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo aluno:`}
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

export default AlunosMain;
