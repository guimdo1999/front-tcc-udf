import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { getAluno } from "../../Utils/Aluno";
import { getProfessor } from "../../Utils/Professor";
import { getDisciplina } from "../../Utils/Disciplina";
import { getTipo_ensino } from "../../Utils/TipoEnsino";
import { getTurma } from "../../Utils/Turma";

function SelectFunction({ expr }) {
  const [busca, setBusca] = useState([]);
  const { Option } = Select;
  console.log(expr);

  useEffect(() => {
    switch (expr) {
      case "aluno":
        getAluno().then((data) => {
          setBusca(data);
        });

        break;
      case "professor":
        getProfessor().then((data) => {
          setBusca(data);
        });
        break;
      case "disciplina":
        getDisciplina().then((data) => {
          setBusca(data);
        });
        break;
      case "tipo_ensino":
        getTipo_ensino().then((data) => {
          setBusca(data);
        });
        break;
      case "turma":
        getTurma().then((data) => {
          setBusca(data);
        });
        break;

      default:
        console.log(`A expressão: ${expr} não existe.`);
    }
  }, []);

  function onChange(value) {
    console.log(value);
  }

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
        placeholder={`Selecione um ${expr}`}
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
          switch (expr) {
            case "aluno":
              return (
                <Option value={map.nome_aluno} key={map.id_aluno}>
                  {map.nome_aluno}
                </Option>
              );
            case "professor":
              return (
                <Option value={map.nome_professor}>{map.nome_professor}</Option>
              );
            case "disciplina":
              return (
                <Option value={map.nome_disciplina}>
                  {map.nome_disciplina}
                </Option>
              );
            case "tipo_ensino":
              return (
                <Option value={map.nome_tipo_ensino}>
                  {map.nome_tipo_ensino}
                </Option>
              );
            case "turma":
              <Option value={map.nome_turma}>{map.nome_turma}</Option>;
              // expected output: "Mangoes and papayas are $2.79 a pound."
              break;
            default:
              return null;
          }
        })}
      </Select>
    </>
  );
}

export default SelectFunction;
