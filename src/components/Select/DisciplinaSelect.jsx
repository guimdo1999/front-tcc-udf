import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getDisciplina, getDisciplinaId } from "../../Utils/Disciplina";
import { Link, Route } from "react-router-dom";
import UpdateDisciplina from "../Update/UpdateDisciplina";

function DisciplinaSelect() {
  const [busca, setBusca] = useState([]);
  const [disciplina, setDisciplina] = useState({});

  const { Option } = Select;

  useEffect(() => {
    getDisciplina().then((data) => {
      setBusca(data);
    });
  }, []);
  console.log(busca);

  function onChange(value) {
    console.log(value);
    getDisciplinaId(value).then((data) => {
      setDisciplina(data);
    });
  }
  console.log(Disciplina);

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
            <Option value={map.id_disciplina} key={map.id_disciplina}>
              {map.nome_disciplina}
            </Option>
          );
        })}
      </Select>
      {/* 
            <Link to={`/main/disciplina/selecionar/${map.id_disciplina}`}>
            </Link>
      <Route path={`/main/disciplina/selecionar/`}>
        <UpdateDisciplina />
      </Route> 
      */}
    </>
  );
}

export default DisciplinaSelect;
