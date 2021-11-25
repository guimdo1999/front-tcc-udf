import React, { useEffect, useState } from "react";

import { Alert, Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteProfessor, getProfessor } from "../../Utils/Professor";
import FormProfessor from "./FormProfessor";
import UpdateProfessor from "./UpdateProfessor";

function ProfessoresMain() {
  const [busca, setBusca] = useState([]);
  const [professor, setprofessor] = useState();
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
      getProfessor().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do professor",
      dataIndex: "nome_professor",
      key: "nome_professor",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_professor.localeCompare(b.nome_professor),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Mátricula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
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
      title: "Ações",
      key: "id_professor",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setprofessor(record);
              setModalContent(
                <Modal
                  title={`Editando a professor: ${record.nome_professor}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateProfessor professor={professor} handleOk={handleOk} />
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
                  title={`Deletando a professor: ${record.nome_professor}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar a professor{" "}
                    {record.nome_professor}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteProfessor(record.id_professor).then(() => {
                        <Alert message="Success Text" type="success" />;
                        alert(`Deletado o professor: ${record.nome_professor}`);

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
    <Card title="Gerenciamento de Professores" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo professor:`}
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
        placeholder="Pesquisar por professor"
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
