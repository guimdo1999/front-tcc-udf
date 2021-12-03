import React, { useEffect, useState } from "react";

import { Button, Card, message, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import { deleteHorario, getHorario } from "../../Utils/Horario";

import FormHorario from "./FormHorario";
import DeletePop from "../../components/DeletePop";
import moment from "moment";

function HorariosMain() {
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
    deleteHorario(value.id_horario)
      .then(() => {
        message.success({
          content: `Horario: ${value.nome_horario} foi deletado.`,
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
      getHorario().then((data) => {
        setBusca(data);
        setReload(false);
      });
    }
  }, [valueF, reload]);

  const format = "HH:mm";

  const columns = [
    {
      title: "Nome do Horário ",
      dataIndex: "nome_horario",
      key: "nome_horario",

      render: (text) => <p>{text}</p>,

      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Turno",
      dataIndex: "Turno",
      key: "Turno",
      render: (turno) => {
        if (turno) {
          return turno.nome_turno;
        } else {
          return null;
        }
      },
    },
    {
      title: "Dia",
      dataIndex: "Dias",
      key: "Dias",
      render: (dia) => {
        if (dia) {
          return dia.nome_dia;
        } else {
          return null;
        }
      },
    },
    {
      title: "Hora Inicial",
      dataIndex: "hora_inicio",
      key: "hora_inicio",
      render: (data) => {
        return moment(data).format(format);
      },
    },
    {
      title: "Hora Final",
      dataIndex: "hora_fim",
      key: "hora_fim",
      render: (data) => {
        return moment(data).format(format);
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
      key: "id_horario",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setModalContent(
                <Modal
                  title={`Editando o horario: ${record.nome_horario}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <FormHorario horario={record} handleOk={handleOk} />
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
    <Card title="Gerenciamento de Horários " style={{ width: "100%" }}>
      <Row>
        <Button
          type="primary"
          onClick={() => {
            setModalContent(
              <Modal
                title={`Cadastrando novo Horario :`}
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <FormHorario handleOk={handleOk} />
              </Modal>
            );

            setVisible(true);
          }}
        >
          Cadastrar Horário
        </Button>
      </Row>
      <br></br>
      <br></br>
      {modalContent}
      <Search
        placeholder="Pesquisar por Matéria"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.nome_horario.toLocaleLowerCase().includes(valorAtual)
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

export default HorariosMain;
