import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getProfessor, getProfessorId } from "../../Utils/Professor";
import { Link, Route } from "react-router-dom";

function ProfessorSelect() {
  const [busca, setBusca] = useState([]);
  const [professor, setProfessor] = useState({});

  const { Option } = Select;

  useEffect(() => {
    getProfessor().then((data) => {
      setBusca(data);
    });
  }, []);
  console.log(busca);

  function onChange(value) {
    console.log(value);
    getProfessorId(value).then((data) => {
      setProfessor(data);
    });
  }
  console.log(professor);

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
        placeholder={`Selecione um Professor`}
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
            <Option value={map.id_professor} key={map.id_professor}>
              {map.nome_professor}
            </Option>
          );
        })}
      </Select>
      {/* 
            <Link to={`/main/professor/selecionar/${map.id_professor}`}>
            </Link>
      <Route path={`/main/professor/selecionar/`}>
        <UpdateProfessor />
      </Route> 
      */}
    </>
  );
}

export default ProfessorSelect;
