import React, { useEffect } from "react";

import { Button, Table, message, Card } from "antd";
import moment from "moment";

import { insertGrade } from "../Utils/Grade";

function Gradegerada({ Grade_Gerada, horario, professor, aula, handleOk }) {
  const format = "HH:MM";
  const key = "updatable";

  const columns = [
    {
      title: "Dia",
      dataIndex: "nome_dia",
      key: "nome_dia",
    },
    {
      title: "Horário",
      dataIndex: "id_horario",
      key: "id_horario",
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
    },
    {
      title: "Nome da Aula",
      dataIndex: "id_aula_atual",
      key: "id_aula_atual",
      render: (id) => {
        if (aula) {
          const found = aula.find((obj) => obj.id_aula === id);
          return found.nome_aula;
        }
      },
    },

    {
      title: "Matéria",
      dataIndex: "nome_materia",
      key: "nome_materia",
    },
    {
      title: "Professor",
      dataIndex: "id_aula_atual",
      key: "id_aula_atual",
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
  console.log(Grade_Gerada);
  return (
    <Card>
      <Table
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={Grade_Gerada}
        showSorterTooltip={false}
      />
      <Button
        type="primary"
        onClick={() => {
          message.loading({
            content: `Gerando grade...`,
            key,
          });
          Grade_Gerada.forEach((element) => {
            let valorInsere = {
              fk_horario: element.id_horario,
              fk_turma: element.id_turma,
              fk_aula: element.id_aula_atual,
            };
            insertGrade(valorInsere)
              .then((resposta) => {})
              .catch(() => {
                message.error({
                  content: `Falha ao comunicar com o servidor.`,
                  key,
                });
              });
          });
          message.success({
            content: "Grade gerada e inserida!",
            key,
            duration: 2,
          });
          handleOk();
        }}
        style={{ width: "15%", float: "right", margin: "5px" }}
      >
        Inserir grade
      </Button>
      <h4>
        Se a tabela estiver vazia, certifique-se que os cadastros para essa
        turma estejam corretos.
      </h4>
    </Card>
  );
}

export default Gradegerada;
