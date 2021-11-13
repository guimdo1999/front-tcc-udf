import React, { useEffect, useState } from "react";
import { getAluno, getAlunoId } from "../../Utils/Aluno";
import { Table, Tag, Space } from "antd";
import { Link, Route } from "react-router-dom";
import UpdateAluno from "../Update/UpdateAluno";
import Search from "antd/lib/transfer/search";

function AlunoSelect() {
  const [busca, setBusca] = useState([]);
  const [aluno, setAluno] = useState({});

  useEffect(() => {
    getAluno().then((data) => {
      setBusca(data);
    });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "nome_aluno",
      key: "nome_aluno",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Data de nascimento",
      dataIndex: "data_nascimento",
      key: "data_nascimento",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const alunos = [busca];

  console.log(busca);

  /* function onChange(value) {
    console.log(value);
    getAlunoId(value).then((data) => {
      setAluno(data);
    });
  } */
  console.log(aluno);

  function onSearch(val) {
    console.log(val);
  }

  return (
    <>
      <Search
        onSearch={onSearch}
        style={{
          width: "80%",
        }}
      />
      <Table columns={columns} dataSource={alunos} />{" "}
    </>
  );
}

export default AlunoSelect;
