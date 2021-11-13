import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import FormDisciplina from "../../components/Cadastros/FormDisciplina";
import UpdateDisciplina from "../../components/Update/UpdateDisciplina";

import { deleteDisciplina, getDisciplina } from "../../Utils/Disciplina";

function DisciplinasMain() {
  const [busca, setBusca] = useState([]);
  const [disciplina, setDisciplina] = useState();
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
      getDisciplina().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome do disciplina",
      dataIndex: "nome_disciplina",
      key: "nome_disciplina",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.nome_disciplina.localeCompare(b.nome_disciplina),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Aula exclusiva",
      dataIndex: "aula_exclusiva",
      key: "aula_exclusiva",
    },
    {
      title: "Quantidade de carga horária",
      dataIndex: "qtd_carga_horaria",
      key: "qtd_carga_horaria",
    },
    {
      title: "Quantia de Aulas Semanais",
      dataIndex: "qtd_aulas",
      key: "qtd_aulas",
    },
    {
      title: "Ações",
      key: "id_disciplina",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setDisciplina(record);
              setModalContent(
                <Modal
                  title={`Editando a Disciplina: ${record.nome_disciplina}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateDisciplina
                    disciplina={disciplina}
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
                  title={`Deletando a disciplina: ${record.nome_disciplina}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar a disciplina{" "}
                    {record.nome_disciplina}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteDisciplina(record.id_disciplina).then(() => {
                        alert(
                          `Deletado o Disciplina: ${record.nome_disciplina}`
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
