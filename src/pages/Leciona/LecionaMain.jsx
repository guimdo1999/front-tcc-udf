import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteEnsino, getEnsino } from "../../Utils/Ensino";
import { getProfessor } from "../../Utils/Professor";
import { getDisciplina } from "../../Utils/Disciplina";
import FormEnsino from "../../components/Cadastros/FormEnsino";

function LecionaMain() {
  const [busca, setBusca] = useState([]);
  const [professor, setProfessor] = useState();
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
      getEnsino().then((data) => {
        setBusca(data);
        setReload(false);
      });
      getProfessor().then((data) => {
        setProfessor(data);
      });
      getDisciplina().then((data) => {
        setDisciplina(data);
      });
    }
  }, [valueF, reload]);

  const columns = [
    /* {
      title: "Numero",
      dataIndex: "id_ensino",
      key: "id_ensino",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.id_ensino.localeCompare(b.id_ensino),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    }, */
    {
      title: "Nome do Professor",
      dataIndex: "id_professor",
      key: "id_professor",

      render: (id) => {
        if (professor) {
          const found = professor.find((obj) => obj.id_professor === id);
          return found.nome_professor;
        }
      },
    },
    {
      title: "Nome Disciplina",
      dataIndex: "id_disciplina",
      key: "id_disciplina",

      render: (id) => {
        if (disciplina) {
          const found = disciplina.find((obj) => obj.id_disciplina === id);
          return found.nome_disciplina;
        }
      },
    },
    {
      title: "Ações",
      key: "id_ensino",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Deletar essa conexão?`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>Gostaria mesmo de deletar?</h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteEnsino(record.id_ensino).then(() => {
                        alert(`Deletado.`);

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
    <Card title="Gerenciamento de Leciona" style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando nova conexão:`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormEnsino handleOk={handleOk} />
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

export default LecionaMain;
