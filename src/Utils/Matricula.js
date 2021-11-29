import * as backEndUtils from "./BackEnd";

export const insertMatricula = async (dados) => {
  const registrar_aluno_turma = {
    data_matricula: dados.data_matricula,
    fk_aluno: dados.fk_aluno,
    fk_turma: dados.fk_turma,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aluno_turma", registrar_aluno_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getMatricula = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno_turma")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
export const getMatriculaId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno_turma/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putMatriculaId = async (id, dados) => {
  const update_aluno_turma = {
    data_matricula: dados.data_matricula,
    fk_aluno: dados.fk_aluno,
    fk_turma: dados.fk_turma,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/aluno_turma/" + id, update_aluno_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteMatricula = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/aluno_turma/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
