import React, { useEffect, useState } from "react";

import { Button, Card, Modal, Row, Space, Table } from "antd";
import Search from "antd/lib/input/Search";

import { deleteUsuario, getMe, getUsuarios } from "../../Utils/Login";
import UpdateUsuario from "../../components/Update/UpdateUsuario";

function UsuariosMain() {
  const [busca, setBusca] = useState([]);
  const [usuario, setUsuario] = useState();
  const [valueF, setValueF] = useState("");
  const [reload, setReload] = useState(false);
  const [nomeUser, setNomeUser] = useState("");

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
    getMe().then((data1) => {
      setNomeUser(data1.cod_login);
      if (valueF === "" || reload === true) {
        getUsuarios().then((data) => {
          setBusca(data);

          setReload(false);
        });
      }
    });
  }, [valueF || reload]);

  const columns = [
    {
      title: "Nome de login",
      dataIndex: "cod_login",
      key: "cod_login",

      render: (text) => <p>{text}</p>,

      sorter: (a, b) => a.cod_login.localeCompare(b.cod_login),
      defaultSortOrder: "ascend",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Código de Perfil",
      dataIndex: "cod_perfil",
      key: "cod_perfil",
    },
    {
      title: "Ações",
      key: "cod_login",
      render: (record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              //console.log(record);
              setUsuario(record);
              setModalContent(
                <Modal
                  title={`Editando o usuario: ${record.cod_login}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <UpdateUsuario usuario={usuario} handleOk={handleOk} />
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
                  title={`Deletando o usuario: ${record.cod_login}`}
                  visible={visible}
                  onCancel={handleCancel}
                  footer={null}
                >
                  <h3>
                    Gostaria mesmo de deletar o usuario {record.cod_login}?
                  </h3>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      deleteUsuario(record.cod_login).then(() => {
                        alert(`Deletado o usuario: ${record.cod_login}`);

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
    <Card title="Gerenciamento de Usuários" style={{ width: "100%" }}>
      <br></br>
      <br></br>
      {modalContent}
      <p
        style={{
          width: "45%",
          float: "left",
        }}
      >
        Cuidado com seu próprio usuário.
      </p>
      <Search
        placeholder="Pesquisar por usuário"
        allowClear
        onChange={(e) => {
          const valorAtual = e.target.value.toLocaleLowerCase();
          setValueF(valorAtual);
          const filteredData = busca.filter((entry) =>
            entry.cod_login.toLocaleLowerCase().includes(valorAtual)
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

export default UsuariosMain;
