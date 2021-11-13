import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getAluno, getAlunoId } from "../../Utils/Aluno";
import { Link, Route } from "react-router-dom";
import UpdateAluno from "../Update/UpdateAluno";

function AlunoSelect() {
  const [busca, setBusca] = useState([]);
  const [aluno, setAluno] = useState({});

  const { Option } = Select;

  useEffect(() => {
    getAluno().then((data) => {
      setBusca(data);
    });
  }, []);
  console.log(busca);

  function onChange(value) {
    console.log(value);
    getAlunoId(value).then((data) => {
      setAluno(data);
    });
  }
  console.log(aluno);

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {}

  function onSearch(val) {}

  return (
    <>
      <Select
        showSearch
        style={{ width: "100%" }}
        placeholder={`Selecione um Aluno`}
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {busca.map((map) => {
          return (
            <Option value={map.id_aluno} key={map.id_aluno}>
              {map.nome_aluno}
            </Option>
          );
        })}
      </Select>
      {/* 
            <Link to={`/main/alunos/selecionar/${map.id_aluno}`}>
            </Link>
      <Route path={`/main/alunos/selecionar/`}>
        <UpdateAluno />
      </Route> 
      */}
    </>
  );
}

export default AlunoSelect;
