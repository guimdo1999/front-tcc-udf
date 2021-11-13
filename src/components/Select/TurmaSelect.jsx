import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getTurma, getTurmaId } from "../../Utils/Turma";
import { Link, Route } from "react-router-dom";
import UpdateTurma from "../Update/UpdateTurma";

function TurmaSelect() {
  const [busca, setBusca] = useState([]);
  const [turma, setTurma] = useState({});

  const { Option } = Select;

  useEffect(() => {
    getTurma().then((data) => {
      setBusca(data);
    });
  }, []);
  console.log(busca);

  function onChange(value) {
    console.log(value);
    getTurmaId(value).then((data) => {
      setTurma(data);
    });
  }
  console.log(turma);

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
        placeholder={`Selecione um algo`}
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
            <Option value={map.id_turma} key={map.id_turma}>
              {map.nome_turma}
            </Option>
          );
        })}
      </Select>
      {/* 
            <Link to={`/main/turma/selecionar/${map.id_turma}`}>
            </Link>
      <Route path={`/main/turma/selecionar/`}>
        <UpdateTurma />
      </Route> 
      */}
    </>
  );
}

export default TurmaSelect;
