import * as backEndUtils from "./BackEnd";

export const insertAulas = async (dados) => {
  const registrar_aulas = {
    qtd_aula_semana: dados.qtd_aula_semana,
    data_inicio_aula: dados.data_inicio_aula,
    data_fim_aula: dados.data_fim_aula,
    id_turma: dados.id_turma,
    id_disciplina: dados.id_disciplina,
    id_professor: dados.id_professor,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aula", registrar_aulas)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getAulas = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aula")
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const getAulasId = async (id) => {
  return await backEndUtils
    .chamarBackEnd("GET", `/api/aula/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const putAulaId = async (id, dados) => {
  const update_aulas = {
    qtd_aula_semana: dados.qtd_aula_semana,
    data_inicio_aula: dados.data_inicio_aula,
    data_fim_aula: dados.data_fim_aula,
    id_turma: dados.id_turma,
    id_disciplina: dados.id_disciplina,
    id_professor: dados.id_professor,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/aula/" + id, update_aulas)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteAula = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", `/api/aula/${id}`)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
