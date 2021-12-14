import React, { useState, useEffect } from "react";

import { Card, Row, Select, Space, Table } from "antd";

import moment from "moment";
import { getDia } from "../Utils/Dia";

import { getProfessor } from "../Utils/Professor";
import { getTurma, getTurmaId } from "../Utils/Turma";
import { getAula } from "../Utils/Aula";
import { getHorario } from "../Utils/Horario";

function HomeUser() {
  const [grade, setGrade] = useState([]);

  const [dia, setDia] = useState([]);

  const [reload, setReload] = useState(false);
  const [id_da_turma, setIdDaTurma] = useState("");

  const [professor, setProfessor] = useState([1]);
  const [turma, setTurma] = useState([]);
  const [aula, setAula] = useState([]);
  const [horario, setHorario] = useState([]);

  const format = "HH:mm";

  useEffect(() => {
    getTurma().then((data) => {
      setTurma(data);
    });
    getAula().then((data) => {
      setAula(data);
    });
    getHorario().then((data) => {
      setHorario(data);
    });

    getDia().then((data) => {
      setDia(data);
    });

    getProfessor().then((data) => {
      setProfessor(data);
    });

    if (id_da_turma !== "") {
      getTurmaId(id_da_turma).then((data) => {
        setGrade(data);
      });
    }
    setReload(false);
  }, [id_da_turma, reload]);

  const columns = [
    {
      title: "Dia",
      dataIndex: "fk_horario",
      key: "fk_horario",
      render: (id) => {
        if (horario) {
          const found = horario.find((obj) => obj.id_horario === id);
          const found2 = dia.find((obj) => obj.id_dia === found.fk_dia);
          return found2.nome_dia;
        }
      },
    },
    {
      title: "Horário",
      dataIndex: "fk_horario",
      key: "fk_horario",
      render: (id) => {
        if (horario) {
          const found = horario.find((obj) => obj.id_horario === id);
          return (
            moment(found.hora_inicio).format(format) +
            " - " +
            moment(found.hora_fim).format(format)
          );
        }
      },
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.fk_horario - b.fk_horario,
    },
    {
      title: "Matéria",
      dataIndex: "fk_aula",
      key: "fk_aula",
      render: (id) => {
        if (aula) {
          const found = aula.find((obj) => obj.id_aula === id);
          //console.log(found.Materias.nome_materia);
          return found.Materias.nome_materia;
        }
      },
    },
    {
      title: "Nome da Aula",
      dataIndex: "fk_aula",
      key: "fk_aula",
      render: (id) => {
        if (aula) {
          const found = aula.find((obj) => obj.id_aula === id);
          return found.nome_aula;
        }
      },
      /* filters,
      onFilter: (value, record) => record.fk_aula.indexOf(value) === 0, */
    },
    {
      title: "Professor",
      dataIndex: "fk_aula",
      key: "fk_aula",
      render: (id) => {
        if (aula) {
          const found = aula.find((obj) => obj.id_aula === id);
          const found1 = professor.find(
            (obj) => obj.id_professor === found.fk_professor
          );

          return found1.nome_professor;
        }
      },
    },
  ];
  return (
    <Card title="Gerenciamento de Grade" style={{ width: "100%" }}>
      <Row style={{ marginBottom: 15 }}>
        <Space>
          <Select
            key="select_turma"
            showSearch
            style={{ width: "100%" }}
            onChange={(value) => {
              setIdDaTurma(value);
            }}
            placeholder="Selecione uma turma"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {turma.map((item) => {
              return (
                <Select.Option value={item.id_turma}>
                  {item.nome_turma}
                </Select.Option>
              );
            })}
          </Select>
        </Space>
      </Row>
      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        dataSource={grade.Grades}
        showSorterTooltip={false}
      />
    </Card>
  );
}

export default HomeUser;
